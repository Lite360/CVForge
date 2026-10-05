import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        plans: [
          {
            id: 'free',
            name: 'Free Plan',
            price: 0,
            currency: 'NGN',
            interval: 'forever',
            aiAllowance: 3,
            features: ['1 Basic Template', 'Standard PDF Export', '3 AI Optimizations']
          },
          {
            id: 'monthly',
            name: 'Premium Monthly',
            price: 2900,
            currency: 'NGN',
            interval: 'monthly',
            paystackPlanCode: 'PLN_monthly_cvf',
            aiAllowance: 50,
            features: ['All Templates', 'PDF & DOCX Export', '50 AI Optimizations', 'ATS Compatibility Checker', 'Job Matcher']
          },
          {
            id: 'yearly',
            name: 'Premium Yearly',
            price: 29000,
            currency: 'NGN',
            interval: 'yearly',
            paystackPlanCode: 'PLN_yearly_cvf',
            aiAllowance: 999,
            features: ['All Templates', 'Unlimited PDF & DOCX Export', 'Unlimited AI Optimizations', 'ATS Compatibility Checker', 'Job Matcher', 'Priority Support']
          }
        ]
      })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error: any) {
    return res.status(500).json({ error: 'Admin Plans API error', details: error.message })
  }
}
