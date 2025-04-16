import { verifySession } from '#nuxt-starter-module/server'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'session_token')
  
  if (!token || !verifySession(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated'
    })
  }

  return {
    user: {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      roles: ['user']
    },
    expiresAt: new Date(Date.now() + 86400000).toISOString()
  }
})
