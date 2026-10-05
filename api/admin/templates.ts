import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        templates: [
          { id: 'professional-ats', name: 'Professional ATS', category: 'ATS Friendly', isPremium: false, active: true, font: 'Times New Roman' },
          { id: 'modern-clean', name: 'Modern Clean', category: 'Creative & Tech', isPremium: true, active: true, font: 'Inter' },
          { id: 'executive-suite', name: 'Executive Suite', category: 'Executive', isPremium: true, active: true, font: 'Garamond' }
        ]
      })
    }

    if (req.method === 'POST') {
      return res.status(200).json({ success: true, message: 'Template updated successfully' })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    return res.status(500).json({ error: 'Admin Templates API error', details: error.message })
  }
}
