import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { cvContent, jobDescription } = req.body || {}

    if (!cvContent || !jobDescription) {
      return res.status(400).json({ error: 'Both CV content and Job Description are required' })
    }

    const jobLower = jobDescription.toLowerCase()
    const cvText = JSON.stringify(cvContent).toLowerCase()

    // Common skills list check
    const potentialKeywords = [
      'typescript', 'javascript', 'vue', 'react', 'node', 'python', 'sql', 'postgresql',
      'tailwind', 'git', 'docker', 'aws', 'rest api', 'graphql', 'ci/cd', 'agile', 'scrum',
      'project management', 'communication', 'leadership', 'analytics'
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
        matching_keywords_count: matchingSkills.length,
        missing_keywords_count: missingSkills.length,
        recommendations: [
          `Incorporate missing key technical terms: ${missingSkills.slice(0, 4).join(', ')}.`,
          'Tailor your Professional Summary to reference the target job title directly.',
          'Reorder your skills section to prioritize high-relevance keywords from this job posting.'
        ]
      }
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'Job Matching failed', details: error.message })
  }
}
