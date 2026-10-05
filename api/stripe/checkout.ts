/**
 * CVForge — Stripe Checkout Session API
 * 
 * PRD §27, §49: /api/stripe/checkout.ts
 * Creates a Stripe Checkout session for subscription plans (Monthly/Annual).
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { auth } from '../../src/lib/auth.js'

const stripeSecret = process.env.STRIPE_SECRET_KEY || ''
const stripe = new Stripe(stripeSecret, {
  apiVersion: '2025-02-24.acacia' as any
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const host = req.headers.host || 'localhost:3000'
    const reqUrl = req.url || '/api/stripe/checkout'
    const url = new URL(reqUrl, `https://${host}`)
    const headers = new Headers()
    
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === 'string') headers.set(key, value)
      else if (Array.isArray(value)) headers.set(key, value.join(', '))
    }

    const request = new Request(url.toString(), { method: 'POST', headers })
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session?.user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { planId = 'premium', interval = 'monthly' } = req.body || {}

    // Price ID mapping (configure in Stripe Dashboard or .env)
    const priceMap: Record<string, string> = {
      'premium-monthly': process.env.STRIPE_PRICE_PREMIUM_MONTHLY || 'price_mock_premium_monthly',
      'premium-annual': process.env.STRIPE_PRICE_PREMIUM_ANNUAL || 'price_mock_premium_annual',
      'enterprise-monthly': process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_mock_enterprise_monthly'
    }

    const priceId = priceMap[`${planId}-${interval}`] || priceMap['premium-monthly']

    const origin = req.headers.origin || `https://${host}`

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      metadata: {
        userId: session.user.id,
        planId,
        interval
      },
      success_url: `${origin}/profile?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`
    })

    return res.status(200).json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return res.status(500).json({ error: error.message || 'Failed to create checkout session' })
  }
}
