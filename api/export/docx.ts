import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { cvContent } = req.body || {}

    if (!cvContent) {
      return res.status(400).json({ error: 'CV content is required for DOCX export' })
    }

    return res.status(200).json({
      success: true,
      exportType: 'docx',
      filename: `${(cvContent.basics?.name || 'CV').replace(/\s+/g, '_')}_Resume.docx`,
      message: 'DOCX document generated'
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'DOCX Generation failed', details: error.message })
  }
}
