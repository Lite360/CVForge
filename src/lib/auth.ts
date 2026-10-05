/**
 * CVForge — Better Auth Server Configuration
 * 
 * This is the server-side auth instance used by API routes.
 * PRD §25: Better Auth with Google + GitHub OAuth
 */
import { betterAuth } from 'better-auth'
import pg from 'pg'

const { Pool } = pg

export const auth = betterAuth({
  // Database: Neon PostgreSQL (PRD §26)
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }),

  // Email + Password authentication
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6
  },

  // OAuth Providers (PRD §25)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirectURI: process.env.BETTER_AUTH_URL
        ? `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`
        : 'http://localhost:5173/api/auth/callback/google'
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      redirectURI: process.env.BETTER_AUTH_URL
        ? `${process.env.BETTER_AUTH_URL}/api/auth/callback/github`
        : 'http://localhost:5173/api/auth/callback/github'
    }
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24      // Update session every 24 hours
  },

  // Base URL for auth callbacks
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5173',

  // Secret for signing tokens
  secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH0_SECRET || 'cvforge-dev-secret-change-in-production',

  // User fields
  user: {
    additionalFields: {
      theme: {
        type: 'string',
        defaultValue: 'system',
        input: false
      }
    }
  }
})

export type Auth = typeof auth
