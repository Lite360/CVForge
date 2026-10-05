/**
 * CVForge — Admin Mock Data Service
 * 
 * Provides mock datasets and interactive methods for the Admin Dashboard.
 */

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN' | 'PRO_USER'
  plan: 'Free' | 'Pro Monthly' | 'Pro Annual' | 'Enterprise'
  status: 'Active' | 'Suspended' | 'Pending'
  cvCount: number
  createdAt: string
}

export interface AdminCV {
  id: string
  title: string
  userEmail: string
  template: string
  atsScore: number
  format: 'PDF' | 'DOCX'
  createdAt: string
}

export interface AdminTemplate {
  id: string
  name: string
  slug: string
  category: string
  isActive: boolean
  isPremium: boolean
  usageCount: number
}

export interface AdminPlan {
  id: string
  name: string
  price: string
  interval: 'Monthly' | 'Annual' | 'Free'
  activeSubscribers: number
  paystackPlanCode: string
  status: 'Active' | 'Draft'
}

export interface AdminActivityLog {
  id: string
  event: string
  user: string
  timestamp: string
  type: 'info' | 'success' | 'warning' | 'error'
}

// Initial Mock Data
const mockUsers: AdminUser[] = [
  { id: 'usr_1', name: 'John Doe', email: 'john@example.com', role: 'PRO_USER', plan: 'Pro Monthly', status: 'Active', cvCount: 5, createdAt: '2026-09-12' },
  { id: 'usr_2', name: 'Jane Smith', email: 'jane.smith@techcorp.io', role: 'USER', plan: 'Free', status: 'Active', cvCount: 2, createdAt: '2026-09-15' },
  { id: 'usr_3', name: 'Alex Johnson', email: 'alex.j@design.co', role: 'PRO_USER', plan: 'Pro Annual', status: 'Active', cvCount: 12, createdAt: '2026-09-20' },
  { id: 'usr_4', name: 'Michael Brown', email: 'mbrown@devmail.org', role: 'USER', plan: 'Free', status: 'Suspended', cvCount: 1, createdAt: '2026-09-25' },
  { id: 'usr_5', name: 'Sarah Connor', email: 'sarah@skynet.net', role: 'PRO_USER', plan: 'Enterprise', status: 'Active', cvCount: 8, createdAt: '2026-10-01' },
  { id: 'usr_6', name: 'David Miller', email: 'dmiller@business.com', role: 'USER', plan: 'Free', status: 'Active', cvCount: 3, createdAt: '2026-10-03' }
]

const mockCVs: AdminCV[] = [
  { id: 'cv_101', title: 'Senior Software Engineer CV', userEmail: 'john@example.com', template: 'Modern Tech', atsScore: 92, format: 'PDF', createdAt: '2026-10-04 14:20' },
  { id: 'cv_102', title: 'Product Manager Resume', userEmail: 'jane.smith@techcorp.io', template: 'Executive Clean', atsScore: 88, format: 'PDF', createdAt: '2026-10-04 16:45' },
  { id: 'cv_103', title: 'UX Designer Portfolio CV', userEmail: 'alex.j@design.co', template: 'Creative Canvas', atsScore: 95, format: 'DOCX', createdAt: '2026-10-05 09:10' },
  { id: 'cv_104', title: 'DevOps Specialist CV', userEmail: 'sarah@skynet.net', template: 'Onyx Dark', atsScore: 91, format: 'PDF', createdAt: '2026-10-05 10:30' }
]

const mockTemplates: AdminTemplate[] = [
  { id: 'tpl_1', name: 'Modern Elegant', slug: 'modern-elegant', category: 'General', isActive: true, isPremium: false, usageCount: 1420 },
  { id: 'tpl_2', name: 'Executive Leadership', slug: 'executive-leadership', category: 'Executive', isActive: true, isPremium: true, usageCount: 890 },
  { id: 'tpl_3', name: 'Creative Designer', slug: 'creative-designer', category: 'Creative', isActive: true, isPremium: true, usageCount: 650 },
  { id: 'tpl_4', name: 'Minimal Mono', slug: 'minimal-mono', category: 'Minimalist', isActive: true, isPremium: false, usageCount: 930 },
  { id: 'tpl_5', name: 'Tech Specialist', slug: 'tech-specialist', category: 'Tech', isActive: true, isPremium: false, usageCount: 1100 }
]

const mockPlans: AdminPlan[] = [
  { id: 'plan_1', name: 'Free Starter', price: '₦0', interval: 'Free', activeSubscribers: 1200, paystackPlanCode: 'PLN_FREE', status: 'Active' },
  { id: 'plan_2', name: 'Pro Monthly', price: '₦4,500/mo', interval: 'Monthly', activeSubscribers: 185, paystackPlanCode: 'PLN_7x9a01b2', status: 'Active' },
  { id: 'plan_3', name: 'Pro Annual', price: '₦42,000/yr', interval: 'Annual', activeSubscribers: 64, paystackPlanCode: 'PLN_9m2k4p8', status: 'Active' },
  { id: 'plan_4', name: 'Enterprise Tier', price: 'Custom', interval: 'Annual', activeSubscribers: 12, paystackPlanCode: 'PLN_ENT_09', status: 'Active' }
]

const mockLogs: AdminActivityLog[] = [
  { id: 'log_1', event: 'New user registered via Google OAuth', user: 'sarah@skynet.net', timestamp: '5 mins ago', type: 'info' },
  { id: 'log_2', event: 'Paystack Payment Completed (₦4,500)', user: 'alex.j@design.co', timestamp: '22 mins ago', type: 'success' },
  { id: 'log_3', event: 'Gemini AI API Call (Optimizer)', user: 'john@example.com', timestamp: '1 hour ago', type: 'info' },
  { id: 'log_4', event: 'PDF Export Compiled successfully', user: 'dmiller@business.com', timestamp: '2 hours ago', type: 'success' }
]

export const adminMockService = {
  getStats() {
    return {
      totalUsers: mockUsers.length + 1414,
      totalCVs: mockCVs.length + 3886,
      totalRevenue: '₦1,845,000',
      aiSuccessRate: '99.6%',
      primaryAI: 'Google Gemini 1.5 Flash',
      fallbackAI: 'OpenRouter (Claude 3.5 Sonnet)'
    }
  },

  getUsers() {
    return [...mockUsers]
  },

  toggleUserStatus(id: string) {
    const user = mockUsers.find(u => u.id === id)
    if (user) {
      user.status = user.status === 'Active' ? 'Suspended' : 'Active'
    }
    return [...mockUsers]
  },

  getCVs() {
    return [...mockCVs]
  },

  getTemplates() {
    return [...mockTemplates]
  },

  toggleTemplateActive(id: string) {
    const tpl = mockTemplates.find(t => t.id === id)
    if (tpl) tpl.isActive = !tpl.isActive
    return [...mockTemplates]
  },

  toggleTemplatePremium(id: string) {
    const tpl = mockTemplates.find(t => t.id === id)
    if (tpl) tpl.isPremium = !tpl.isPremium
    return [...mockTemplates]
  },

  getPlans() {
    return [...mockPlans]
  },

  getLogs() {
    return [...mockLogs]
  }
}
