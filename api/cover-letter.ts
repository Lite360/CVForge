import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkRateLimit } from './rateLimiter'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown'
  const limitCheck = checkRateLimit(`cover_letter_${clientIp}`, { windowMs: 60 * 1000, maxRequests: 10 })

  if (!limitCheck.allowed) {
    return res.status(429).json({
      error: 'Rate limit reached. Please wait before generating another cover letter.',
      resetInSeconds: limitCheck.resetInSec
    })
  }

  const { cvContent, jobTitle, companyName, jobDescription } = req.body || {}

  const candidateName = cvContent?.basics?.name || 'Applicant'
  const candidateEmail = cvContent?.basics?.email || 'email@example.com'
  const candidatePhone = cvContent?.basics?.phone || 'Phone Number'
  const candidateSummary = cvContent?.basics?.summary || ''
  const skills = (cvContent?.skills || []).map((s: any) => s.name).join(', ')

  const prompt = `Write a compelling, professional cover letter for ${candidateName} applying for the position of "${jobTitle || 'Role'}" at "${companyName || 'the Company'}".
Candidate Summary: ${candidateSummary}
Core Skills: ${skills}
Job Description context: ${jobDescription || 'Standard requirements for the role'}.
Ensure the tone is professional, confident, tailored, and ready to send.`

  const geminiApiKey = process.env.GEMINI_API_KEY
  const openRouterApiKey = process.env.OPENROUTER_API_KEY
  let coverLetterText = ''
  let providerUsed = 'template_generator'

  // 1. Try Gemini
  if (geminiApiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      })

      if (response.ok) {
        const data = await response.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          coverLetterText = text
          providerUsed = 'gemini'
        }
      }
    } catch (err) {
      console.warn('Gemini cover letter call failed, falling back...', err)
    }
  }

  // 2. OpenRouter Fallback
  if (!coverLetterText && openRouterApiKey) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: 'You are an executive career coach and cover letter specialist.' },
            { role: 'user', content: prompt }
          ]
        })
      })

      if (response.ok) {
        const data = await response.json()
        const text = data?.choices?.[0]?.message?.content
        if (text) {
          coverLetterText = text
          providerUsed = 'openrouter'
        }
      }
    } catch (err) {
      console.warn('OpenRouter cover letter fallback failed:', err)
    }
  }

  // 3. Fallback High-Quality Template
  if (!coverLetterText) {
    coverLetterText = `Dear Hiring Team at ${companyName || 'your organization'},

I am writing to express my enthusiastic interest in the ${jobTitle || 'open position'}. With my background in delivering measurable results and applying technical expertise across challenging projects, I am confident in my ability to make an immediate, positive impact on your team.

${candidateSummary ? candidateSummary : 'Throughout my career, I have consistently focused on building scalable solutions, streamlining operational workflows, and collaborating effectively with cross-functional teams.'}

Specifically, my proficiency with ${skills || 'modern industry methodologies'} enables me to analyze complex requirements and translate them into reliable, high-quality deliverables. I admire ${companyName || 'your company'}'s standard of excellence and would welcome the opportunity to contribute my skills to your ongoing success.

Thank you for your time and consideration. I look forward to the possibility of discussing how my experience aligns with your team's goals.

Sincerely,

${candidateName}
${candidateEmail} | ${candidatePhone}`
  }

  return res.status(200).json({
    success: true,
    provider: providerUsed,
    data: {
      coverLetter: coverLetterText,
      candidateName,
      targetCompany: companyName || 'Company'
    }
  })
}
