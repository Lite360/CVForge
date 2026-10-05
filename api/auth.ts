/**
 * CVForge — Auth API Catch-All Route
 * 
 * Vercel Serverless Function that handles all Better Auth routes.
 * PRD §25, §49: /api/auth/[...all].ts
 */
import { auth } from '../src/lib/auth.js'

export default async function handler(req, res) {
  // Convert Vercel's req/res to a standard Request object for Better Auth
  const url = new URL(req.url, `https://${req.headers.host || 'localhost:3000'}`)
  
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value)
  }

  // Read the request body for POST/PUT/PATCH
  let body = undefined
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = JSON.stringify(req.body)
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body,
    // @ts-ignore - duplex is needed for streaming bodies
    duplex: 'half'
  })

  try {
    const response = await auth.handler(request)

    // Forward response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value)
    })

    // Forward status and body
    res.status(response.status)
    
    const responseBody = await response.text()
    if (responseBody) {
      res.send(responseBody)
    } else {
      res.end()
    }
  } catch (error) {
    console.error('Auth handler error:', error)
    res.status(500).json({ error: 'Authentication service error' })
  }
}
