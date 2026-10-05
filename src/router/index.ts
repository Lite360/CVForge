import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // ─── Public ────────────────────────────────
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/public/LandingPage.vue')
  },

  // ─── Auth ──────────────────────────────────
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/auth/RegisterPage.vue'),
    meta: { guestOnly: true }
  },

  // ─── Authenticated App ─────────────────────
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/app/DashboardPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-cvs',
    name: 'MyCVs',
    component: () => import('@/pages/app/DashboardPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editor/:id',
    name: 'CVEditor',
    component: () => import('@/pages/app/CVEditorPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/optimizer',
    name: 'Optimizer',
    component: () => import('@/pages/app/OptimizerPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/ats',
    name: 'ATSChecker',
    component: () => import('@/pages/app/ATSCheckerPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/job-match',
    name: 'JobMatch',
    component: () => import('@/pages/app/JobMatchPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/pages/app/TemplatesPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/app/ProfilePage.vue'),
    meta: { requiresAuth: true }
  },

  // ─── Admin ─────────────────────────────────
  {
    path: '/access',
    name: 'AdminLogin',
    component: () => import('@/pages/admin/AdminLoginPage.vue')
  },
  {
    path: '/access/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/pages/admin/AdminDashboardPage.vue'),
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// ─── Navigation Guards ─────────────────────────
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  // Hydrate auth state from localStorage on first load
  if (!authStore.isAuthenticated) {
    authStore.hydrateFromStorage()
  }

  // Admin protected route: check for admin session token
  if (to.meta.requiresAdmin) {
    const adminToken = localStorage.getItem('cvforge_admin_token')
    if (!adminToken) {
      return next({ name: 'AdminLogin' })
    }
  }

  // Protected routes: redirect to login if not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  // Guest-only routes: redirect to dashboard if already authenticated
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router
