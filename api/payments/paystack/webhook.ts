import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const paystackSecret = process.env.PAYSTACK_SECRET_KEY
  if (!paystackSecret) {
    console.warn('Paystack secret key is not set; skipping webhook verification')
    return res.status(200).json({ status: 'ignored' })
  }

  // 1. Validate signature
  const signature = req.headers['x-paystack-signature'] as string
  const hash = crypto
    .createHmac('sha512', paystackSecret)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (signature !== hash) {
    return res.status(400).json({ error: 'Invalid Paystack webhook signature' })
  }

  const event = req.body
  const eventType = event.event
  const data = event.data

  try {
    if (eventType === 'charge.success') {
      const email = data.customer?.email
      const amount = data.amount ? data.amount / 100 : 0
      const reference = data.reference
      const planCode = data.plan?.plan_code

      console.log(`Payment confirmed for ${email}: NGN ${amount} (Ref: ${reference})`)

      // Update payments table idempotently
      await pool.query(
        `INSERT INTO payments (reference, amount, currency, status, paystack_response)
         VALUES ($1, $2, $3, 'success', $4)
         ON CONFLICT (reference) DO NOTHING`,
        [reference, amount, data.currency || 'NGN', JSON.stringify(data)]
      )
    }

    return res.status(200).json({ status: 'success' })
  } catch (err: any) {
    console.error('Paystack webhook error:', err)
    return res.status(500).json({ error: 'Webhook processing error', detail: err.message })
  }
}
