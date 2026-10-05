/**
 * CVForge — Better Auth Client
 * 
 * Frontend auth client used by Vue components and stores.
 * PRD §25: Better Auth client integration
 */
import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || ''
})

// Export typed helpers for use in components
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession
} = authClient
