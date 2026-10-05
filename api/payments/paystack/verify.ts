import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const reference = req.query.reference || req.body?.reference

    if (!reference) {
      return res.status(400).json({ error: 'Transaction reference is required' })
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY

    if (!paystackSecretKey) {
      // Demo verification response
      return res.status(200).json({
        status: true,
        message: 'Verification successful (Demo Mode)',
        data: {
          status: 'success',
          reference: reference as string,
          amount: 290000,
          currency: 'NGN',
          paid_at: new Date().toISOString(),
          channel: 'card'
        }
      })
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference as string)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    return res.status(response.ok ? 200 : 400).json(data)
  } catch (error: any) {
    console.error('Paystack verification error:', error)
    return res.status(500).json({ error: 'Failed to verify transaction', details: error.message })
  }
}
