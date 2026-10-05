import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY

    if (paystackSecretKey) {
      const hash = crypto
        .createHmac('sha512', paystackSecretKey)
        .update(JSON.stringify(req.body))
        .digest('hex')

      if (hash !== req.headers['x-paystack-signature']) {
        return res.status(401).json({ error: 'Invalid webhook signature' })
      }
    }

    const event = req.body

    if (event?.event === 'charge.success') {
      const data = event.data
      console.log('Payment successful webhook received for reference:', data.reference)
      // Database subscription status update will process here when DB pool is initialized
    }

    return res.status(200).json({ status: true, message: 'Webhook received' })
  } catch (error: any) {
    console.error('Paystack webhook error:', error)
    return res.status(500).json({ error: 'Webhook processing failed', details: error.message })
  }
}
