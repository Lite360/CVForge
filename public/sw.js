const CACHE_NAME = 'cvforge-v2'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Never intercept API endpoints
  if (event.request.url.includes('/api/')) {
    return
  }
  
  // Network-First Strategy: Always get fresh content if online
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return networkResponse
      })
      .catch(async () => {
        // Fallback to cache if offline
        const cachedResponse = await caches.match(event.request)
        if (cachedResponse) return cachedResponse
        
        // If it's a page navigation request and offline, fallback to index.html
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html')
        }
      })
  )
})
