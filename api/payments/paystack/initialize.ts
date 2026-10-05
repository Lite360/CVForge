import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { planId, email, callbackUrl } = req.body || {}

    if (!email) {
      return res.status(400).json({ error: 'Email is required for payment initialization' })
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY

    if (!paystackSecretKey) {
      // Demo response for local dev if secret key isn't present
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

    // Call Paystack API endpoint
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: planId === 'yearly' ? 29000 * 100 : 2900 * 100, // NGN in kobo
        currency: 'NGN',
        callback_url: callbackUrl || `${req.headers.origin || 'http://localhost:5173'}/profile?payment=success`,
        metadata: {
          planId,
          custom_fields: [
            {
              display_name: 'Product',
              variable_name: 'product',
              value: 'CVForge Premium Subscription'
            }
          ]
        }
      })
    })

    const data = await response.json()
    return res.status(response.ok ? 200 : 400).json(data)
  } catch (error: any) {
    console.error('Paystack initialization error:', error)
    return res.status(500).json({ error: 'Failed to initialize payment', details: error.message })
  }
}
