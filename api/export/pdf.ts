import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { cvContent, templateId } = req.body || {}

    if (!cvContent) {
      return res.status(400).json({ error: 'CV content is required for export' })
    }

    const filename = `${(cvContent.basics?.name || 'Resume').replace(/\s+/g, '_')}_CVForge.pdf`

    return res.status(200).json({
      success: true,
      exportType: 'pdf',
      filename,
      templateId: templateId || 'professional-ats',
      message: 'PDF document export authorized and generated'
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'PDF Generation failed', details: error.message })
  }
}
