import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { action, cvContent, jobDescription } = req.body || {}

    if (action === 'match_job') {
      if (!cvContent || !jobDescription) {
        return res.status(400).json({ error: 'Both CV content and Job Description are required' })
      }

      const jobLower = jobDescription.toLowerCase()
      const cvText = JSON.stringify(cvContent).toLowerCase()

      const potentialKeywords = [
        'typescript', 'javascript', 'vue', 'react', 'node', 'python', 'sql', 'postgresql',
        'tailwind', 'git', 'docker', 'aws', 'rest api', 'graphql', 'ci/cd', 'agile', 'scrum'
      ]

      const matchingSkills = potentialKeywords.filter(kw => jobLower.includes(kw) && cvText.includes(kw))
      const missingSkills = potentialKeywords.filter(kw => jobLower.includes(kw) && !cvText.includes(kw))
      const matchPct = Math.min(95, Math.max(50, Math.floor((matchingSkills.length / Math.max(1, matchingSkills.length + missingSkills.length)) * 100)))

      return res.status(200).json({
        success: true,
        data: {
          match_percentage: matchPct,
          matching_skills: matchingSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
          missing_skills: missingSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
          recommendations: [
            `Incorporate missing key technical terms: ${missingSkills.slice(0, 4).join(', ')}.`,
            'Tailor your Professional Summary to reference the target job title directly.'
          ]
        }
      })
    }

    // Default: ATS Analyze
    if (!cvContent) {
      return res.status(400).json({ error: 'CV content is required' })
    }

    const hasSummary = Boolean(cvContent.basics?.summary)
    const hasWork = Array.isArray(cvContent.work) && cvContent.work.length > 0
    const hasEdu = Array.isArray(cvContent.education) && cvContent.education.length > 0
    const hasSkills = Array.isArray(cvContent.skills) && cvContent.skills.length > 0

    const structureScore = (hasSummary ? 25 : 0) + (hasWork ? 35 : 0) + (hasEdu ? 20 : 0) + (hasSkills ? 20 : 0)
    const overallScore = Math.min(98, Math.max(60, Math.floor(structureScore * 0.85 + 12)))

    return res.status(200).json({
      success: true,
      data: {
        overall_score: overallScore,
        keyword_match_pct: 82,
        structure_score: structureScore,
        skills_score: hasSkills ? 88 : 45,
        formatting_score: 94,
        recommendations: [
          'Ensure your contact details include phone and email in clean text format.',
          'Quantify your accomplishments with numbers and measurable outcomes.'
        ]
      }
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'ATS Processing failed', details: error.message })
  }
}
