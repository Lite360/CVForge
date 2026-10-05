import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { cvContent } = req.body || {}

    if (!cvContent) {
      return res.status(400).json({ error: 'CV content is required for ATS analysis' })
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
        section_breakdown: {
          personal_info: { status: cvContent.basics?.email ? 'pass' : 'warning', score: 95 },
          summary: { status: hasSummary ? 'pass' : 'missing', score: hasSummary ? 85 : 0 },
          experience: { status: hasWork ? 'pass' : 'missing', score: hasWork ? 90 : 0 },
          education: { status: hasEdu ? 'pass' : 'missing', score: hasEdu ? 95 : 0 },
          skills: { status: hasSkills ? 'pass' : 'warning', score: hasSkills ? 88 : 30 }
        },
        recommendations: [
          'Ensure your email and phone number are formatted cleanly without special icons in plain text exports.',
          'Add bullet points detailing measurable achievements in your experience section.',
          'Include exact technical tools and skill names mentioned in target job descriptions.'
        ]
      }
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'ATS Analysis failed', details: error.message })
  }
}
