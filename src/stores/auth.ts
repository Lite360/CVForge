/**
 * CVForge — Auth Store (Better Auth Integration)
 * 
 * PRD §25: Uses Better Auth for session management.
 * Server-side session is the source of truth.
 * Falls back to localStorage hydration for instant UI on reload.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authClient } from '@/lib/auth-client'

export interface User {
  id: string
  name: string
  email: string
  image?: string | null
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface CVForgeUser {
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
  const user = ref<CVForgeUser | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const initials = computed(() => {
    if (!user.value) return ''
    const parts = user.value.fullName.split(' ')
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2)
  })

  /**
   * Map Better Auth user to CVForge user format.
   * AI credits and plan will come from the backend /api/users/me endpoint in future.
   */
  function mapBetterAuthUser(baUser: User): CVForgeUser {
    return {
      id: baUser.id,
      fullName: baUser.name || baUser.email.split('@')[0],
      email: baUser.email,
      avatarUrl: baUser.image || undefined,
      plan: 'free',
      aiCreditsUsed: 0,
      aiCreditsTotal: 10,
      createdAt: baUser.createdAt
    }
  }

  /**
   * Fetch session from Better Auth server.
   * This is the source of truth for authentication state.
   */
  async function fetchSession() {
    try {
      const session = await authClient.getSession()
      if (session?.data?.user) {
        const mapped = mapBetterAuthUser(session.data.user as unknown as User)
        user.value = mapped
        localStorage.setItem('cvforge_user', JSON.stringify(mapped))
        return true
      } else {
        user.value = null
        localStorage.removeItem('cvforge_user')
        return false
      }
    } catch {
      // Session fetch failed — keep existing hydrated state if any
      return !!user.value
    }
  }

  /**
   * Email/password sign up via Better Auth.
   */
  async function register(fullName: string, email: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      const result = await authClient.signUp.email({
        name: fullName,
        email,
        password
      })

      if (result.error) {
        throw new Error(result.error.message || 'Registration failed')
      }

      // Fetch session to get the user data
      await fetchSession()
      return true
    } catch (e: any) {
      error.value = e.message || 'Registration failed. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Email/password sign in via Better Auth.
   */
  async function login(email: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      const result = await authClient.signIn.email({
        email,
        password
      })

      if (result.error) {
        throw new Error(result.error.message || 'Invalid credentials')
      }

      await fetchSession()
      return true
    } catch (e: any) {
      error.value = e.message || 'Login failed. Please try again.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Social OAuth sign in (Google or GitHub).
   */
  async function socialLogin(provider: 'google' | 'github') {
    isLoading.value = true
    error.value = null
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard'
      })
      // The browser will redirect to the OAuth provider
      return true
    } catch (e: any) {
      error.value = e.message || `${provider} login failed`
      isLoading.value = false
      return false
    }
  }

  /**
   * Sign out and clear session.
   */
  async function logout() {
    try {
      await authClient.signOut()
    } catch {
      // Ignore signout errors
    }
    user.value = null
    localStorage.removeItem('cvforge_user')
  }

  /**
   * Hydrate auth state from localStorage for instant UI on reload.
   * Then verify with the server in the background.
   */
  function hydrateFromStorage() {
    const stored = localStorage.getItem('cvforge_user')
    if (stored) {
      try {
        user.value = JSON.parse(stored)
      } catch {
        localStorage.removeItem('cvforge_user')
      }
    }
    // Verify session with server in background
    fetchSession()
  }

  /**
   * Update local profile data.
   */
  function updateProfile(data: Partial<Pick<CVForgeUser, 'fullName' | 'email' | 'avatarUrl'>>) {
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
    socialLogin,
    logout,
    hydrateFromStorage,
    fetchSession,
    updateProfile
  }
})
