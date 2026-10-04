import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  fullName: string
  email: string
  avatarUrl?: string
  plan: 'free' | 'premium' | 'enterprise'
  aiCreditsUsed: number
  aiCreditsTotal: number
  createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const initials = computed(() => {
    if (!user.value) return ''
    const parts = user.value.fullName.split(' ')
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2)
  })

  async function login(email: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      // Simulate API call — replace with Better Auth integration
      await new Promise(resolve => setTimeout(resolve, 1200))

      if (password.length < 6) {
        throw new Error('Invalid credentials. Please try again.')
      }

      user.value = {
        id: crypto.randomUUID(),
        fullName: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        plan: 'free',
        aiCreditsUsed: 2,
        aiCreditsTotal: 10,
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('cvforge_user', JSON.stringify(user.value))
      return true
    } catch (e: any) {
      error.value = e.message || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(fullName: string, email: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.')
      }

      user.value = {
        id: crypto.randomUUID(),
        fullName,
        email,
        plan: 'free',
        aiCreditsUsed: 0,
        aiCreditsTotal: 10,
        createdAt: new Date().toISOString()
      }

      localStorage.setItem('cvforge_user', JSON.stringify(user.value))
      return true
    } catch (e: any) {
      error.value = e.message || 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('cvforge_user')
  }

  function hydrateFromStorage() {
    const stored = localStorage.getItem('cvforge_user')
    if (stored) {
      try {
        user.value = JSON.parse(stored)
      } catch {
        localStorage.removeItem('cvforge_user')
      }
    }
  }

  function updateProfile(data: Partial<Pick<User, 'fullName' | 'email' | 'avatarUrl'>>) {
    if (user.value) {
      user.value = { ...user.value, ...data }
      localStorage.setItem('cvforge_user', JSON.stringify(user.value))
    }
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    initials,
    login,
    register,
    logout,
    hydrateFromStorage,
    updateProfile
  }
})
