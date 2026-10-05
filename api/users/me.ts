/**
 * CVForge — User Profile API
 * 
 * PRD §25: Authenticated APIs must derive user identity from server-side session.
 * PRD §49: /api/users/me.ts
 */
import { auth } from '../../src/lib/auth.js'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get session from Better Auth (PRD §25: derive user from session)
    const url = new URL(req.url, `https://${req.headers.host || 'localhost:3000'}`)
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value)
    }

    const request = new Request(url.toString(), { method: 'GET', headers })
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session?.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const userId = session.user.id

    // Get subscription info
    const subResult = await pool.query(
      `SELECT s.*, p.name as plan_name, p.slug as plan_slug, p.ai_allowance_monthly
       FROM subscriptions s
       JOIN plans p ON s.plan_id = p.id
       WHERE s.user_id = $1 AND s.status = 'active'
       ORDER BY s.created_at DESC LIMIT 1`,
      [userId]
    )

    // Get AI usage this month
    const aiResult = await pool.query(
      `SELECT COUNT(*) as usage_count
       FROM ai_usage
       WHERE user_id = $1
       AND created_at >= date_trunc('month', CURRENT_TIMESTAMP)`,
      [userId]
    )

    const subscription = subResult.rows[0] || null
    const aiUsageCount = parseInt(aiResult.rows[0]?.usage_count || '0')
    const aiAllowance = subscription?.ai_allowance_monthly || 10

    return res.status(200).json({
      id: session.user.id,
      fullName: session.user.name,
      email: session.user.email,
      avatarUrl: session.user.image,
      plan: subscription?.plan_slug || 'free',
      aiCreditsUsed: aiUsageCount,
      aiCreditsTotal: aiAllowance,
      subscription: subscription ? {
        planName: subscription.plan_name,
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end
      } : null,
      createdAt: session.user.createdAt
    })
  } catch (error) {
    console.error('User profile error:', error)
    return res.status(500).json({ error: 'Could not fetch user profile' })
  }
}
