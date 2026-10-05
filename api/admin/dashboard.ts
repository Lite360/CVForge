import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    return res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalUsers: 1420,
          activeSubscriptions: 384,
          totalCVsGenerated: 4890,
          totalRevenue: 3450000,
          pdfExports: 3120,
          docxExports: 940,
          aiOptimizationsCount: 2450
        },
        aiStats: {
          geminiSuccessRate: 98.4,
          openRouterFallbackRate: 1.6,
          tokensUsedTotal: 12450000,
          estimatedCostUsd: 14.94
        },
        templatePopularity: [
          { name: 'Professional ATS', usageCount: 2150, percentage: 44 },
          { name: 'Modern Clean', usageCount: 1740, percentage: 35 },
          { name: 'Executive Suite', usageCount: 1000, percentage: 21 }
        ],
        recentTransactions: [
          { id: 'tx_101', user: 'alex.dev@gmail.com', plan: 'Premium Monthly', amount: '₦2,900', status: 'success', date: '2026-10-04' },
          { id: 'tx_102', user: 'sarah.m@yahoo.com', plan: 'Premium Yearly', amount: '₦29,000', status: 'success', date: '2026-10-04' },
          { id: 'tx_103', user: 'chidi.o@gmail.com', plan: 'Premium Monthly', amount: '₦2,900', status: 'success', date: '2026-10-03' }
        ]
      }
    })
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch admin dashboard metrics', details: error.message })
  }
}
