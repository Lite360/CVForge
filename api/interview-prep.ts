import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkRateLimit } from './rateLimiter'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown'
  const limitCheck = checkRateLimit(`interview_${clientIp}`, { windowMs: 60 * 1000, maxRequests: 12 })

  if (!limitCheck.allowed) {
    return res.status(429).json({
      error: 'Too many interview requests. Please slow down.',
      resetInSeconds: limitCheck.resetInSec
    })
  }

  const { cvContent, jobTitle, industry, experienceLevel } = req.body || {}

  const candidateSummary = cvContent?.basics?.summary || 'Experienced professional'
  const skills = (cvContent?.skills || []).map((s: any) => s.name).join(', ')

  const prompt = `You are an executive hiring manager and interview coach.
Generate 5 tailored interview questions for a candidate applying for "${jobTitle || 'Professional Role'}" in the "${industry || 'Technology'}" industry (Experience Level: ${experienceLevel || 'Mid-Senior'}).
Candidate background: ${candidateSummary}.
Key skills: ${skills}.

Return a structured JSON object with this exact shape:
{
  "role": "${jobTitle || 'Role'}",
  "readiness_tip": "One key tip for excelling in this interview",
  "questions": [
    {
      "id": 1,
      "category": "Behavioral" | "Technical" | "Situational" | "Leadership",
      "question": "Question text",
      "what_interviewers_look_for": "Key signals to demonstrate",
      "suggested_star_answer": "STAR framework outline for an impressive response"
    }
  ]
}`

  const geminiApiKey = process.env.GEMINI_API_KEY
  const openRouterApiKey = process.env.OPENROUTER_API_KEY
  let aiOutput: any = null
  let providerUsed = 'curated_bank'

  // 1. Try Gemini
  if (geminiApiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      })

      if (response.ok) {
        const data = await response.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          aiOutput = JSON.parse(text)
          providerUsed = 'gemini'
        }
      }
    } catch (err) {
      console.warn('Gemini interview prep call failed, falling back...', err)
    }
  }

  // 2. OpenRouter Fallback
  if (!aiOutput && openRouterApiKey) {
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
            { role: 'system', content: 'You are an executive career coach and technical interviewer.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' }
        })
      })

      if (response.ok) {
        const data = await response.json()
        const text = data?.choices?.[0]?.message?.content
        if (text) {
          aiOutput = JSON.parse(text)
          providerUsed = 'openrouter'
        }
      }
    } catch (err) {
      console.warn('OpenRouter interview prep fallback failed:', err)
    }
  }

  // 3. High-Quality Fallback Bank
  if (!aiOutput) {
    aiOutput = {
      role: jobTitle || 'Software Engineer',
      readiness_tip: 'Ground every behavioral answer with quantifiable metrics (%, time saved, business revenue impact).',
      questions: [
        {
          id: 1,
          category: 'Behavioral',
          question: `Tell me about a high-stakes technical challenge you faced at your previous role and how you navigated it.`,
          what_interviewers_look_for: 'Problem decomposition, cross-functional communication, and accountability under pressure.',
          suggested_star_answer: 'Situation: Outdated microservice causing intermittent latency. Task: Lead architecture overhaul. Action: Built automated benchmarks and deployed canary releases. Result: Cut latency by 45%.'
        },
        {
          id: 2,
          category: 'Technical',
          question: `How do you ensure data integrity and low latency when designing scalable database schemas for ${jobTitle || 'modern systems'}?`,
          what_interviewers_look_for: 'Understanding of indexing, normalization tradeoffs, connection pooling, and caching layers.',
          suggested_star_answer: 'Focus on query execution plans, appropriate B-tree or GiST indexing, Redis caching for hot reads, and read replicas.'
        },
        {
          id: 3,
          category: 'Situational',
          question: `How do you handle conflicting architectural priorities between engineering quality and tight product release deadlines?`,
          what_interviewers_look_for: 'Pragmatism, technical debt tracking, and business empathy.',
          suggested_star_answer: 'Acknowledge scope tradeoffs, ship an MVP with robust telemetry, and schedule dedicated refactoring sprints immediately after launch.'
        },
        {
          id: 4,
          category: 'Leadership',
          question: `Describe a situation where you had to mentor an underperforming teammate or align team members behind a new technology stack.`,
          what_interviewers_look_for: 'Empathy, constructive feedback loops, documentation standards, and culture building.',
          suggested_star_answer: 'Initiated bi-weekly pair programming sessions, created comprehensive RFC onboarding docs, and celebrated incremental milestones.'
        },
        {
          id: 5,
          category: 'Situational',
          question: `Where do you see yourself making the biggest operational impact within your first 90 days in this role?`,
          what_interviewers_look_for: 'Proactivity, fast ramp-up ability, and strategic understanding of company objectives.',
          suggested_star_answer: 'Days 1-30: Deep dive into codebase and team dynamics. Days 31-60: Ship first high-priority feature. Days 61-90: Identify workflow bottlenecks and propose automation improvements.'
        }
      ]
    }
  }

  return res.status(200).json({
    success: true,
    provider: providerUsed,
    data: aiOutput
  })
}
