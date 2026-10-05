import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY

  // Handle Paystack Webhook
  if (req.method === 'POST' && req.headers['x-paystack-signature']) {
    if (paystackSecretKey) {
      const hash = crypto
        .createHmac('sha512', paystackSecretKey)
        .update(JSON.stringify(req.body))
        .digest('hex')

      if (hash !== req.headers['x-paystack-signature']) {
        return res.status(401).json({ error: 'Invalid webhook signature' })
      }
    }
    return res.status(200).json({ status: true, message: 'Webhook received' })
  }

  // Handle Initialize Payment
  if (req.method === 'POST') {
    const { planId, email, callbackUrl } = req.body || {}

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    if (!paystackSecretKey) {
      const mockReference = 'CVF_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
      return res.status(200).json({
        status: true,
        message: 'Authorization URL created (Demo Mode)',
        data: {
          authorization_url: `${callbackUrl || 'http://localhost:5173/profile'}?reference=${mockReference}&status=success`,
          access_code: 'demo_access_code_' + mockReference,
          reference: mockReference
        }
      })
    }

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: planId === 'yearly' ? 29000 * 100 : 2900 * 100,
        currency: 'NGN',
        callback_url: callbackUrl || `${req.headers.origin || 'http://localhost:5173'}/profile?payment=success`
      })
    })

    const data = await response.json()
    return res.status(response.ok ? 200 : 400).json(data)
  }

  // Handle Verification
  if (req.method === 'GET') {
    const reference = req.query.reference

    if (!reference) {
      return res.status(400).json({ error: 'Reference parameter is required' })
    }

    if (!paystackSecretKey) {
      return res.status(200).json({
        status: true,
        message: 'Verification successful (Demo Mode)',
        data: { status: 'success', reference: reference as string }
      })
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference as string)}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${paystackSecretKey}` }
    })

    const data = await response.json()
    return res.status(response.ok ? 200 : 400).json(data)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
