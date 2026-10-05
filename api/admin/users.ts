import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        users: [
          { id: 'usr_1', name: 'Alex Johnson', email: 'alex.dev@gmail.com', plan: 'Premium Monthly', status: 'active', cvsCount: 4, createdAt: '2026-08-12' },
          { id: 'usr_2', name: 'Sarah Miller', email: 'sarah.m@yahoo.com', plan: 'Premium Yearly', status: 'active', cvsCount: 2, createdAt: '2026-09-01' },
          { id: 'usr_3', name: 'David Smith', email: 'david.smith@tech.co', plan: 'Free', status: 'active', cvsCount: 1, createdAt: '2026-09-15' },
          { id: 'usr_4', name: 'Grace Nwosu', email: 'grace.n@gmail.com', plan: 'Free', status: 'suspended', cvsCount: 0, createdAt: '2026-09-20' }
        ]
      })
    }

    if (req.method === 'POST') {
      const { action, userId } = req.body || {}
      return res.status(200).json({
        success: true,
        message: `User ${userId} status updated to ${action}`
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    return res.status(500).json({ error: 'Admin Users API error', details: error.message })
  }
}
