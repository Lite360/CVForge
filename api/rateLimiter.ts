/**
 * In-memory / edge rate limiter utility for serverless endpoints.
 * PRD §54: Rate limiting on Auth, AI requests, and ATS scoring.
 */

interface RateLimitRecord {
  count: number
  resetTime: number
}

const memoryStore = new Map<string, RateLimitRecord>()

export interface RateLimitOptions {
  windowMs?: number // e.g. 60000 (1 minute)
  maxRequests?: number // e.g. 20 requests per window
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetInSec: number } {
  const windowMs = options.windowMs || 60 * 1000
  const maxRequests = options.maxRequests || 30
  const now = Date.now()

  // Clean old expired keys periodically
  if (memoryStore.size > 1000) {
    for (const [key, record] of memoryStore.entries()) {
      if (now > record.resetTime) {
        memoryStore.delete(key)
      }
    }
  }

  const existing = memoryStore.get(identifier)

  if (!existing || now > existing.resetTime) {
    memoryStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInSec: Math.ceil(windowMs / 1000)
    }
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((existing.resetTime - now) / 1000)
    }
  }

  existing.count += 1
  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    resetInSec: Math.ceil((existing.resetTime - now) / 1000)
  }
}
