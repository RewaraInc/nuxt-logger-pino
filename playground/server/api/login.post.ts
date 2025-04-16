import { validateCredentials, createSession } from '#nuxt-starter-module/server'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)
  
  if (!validateCredentials(username, password)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }

  const session = createSession()
  
  setCookie(event, 'session_token', session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400,
    sameSite: 'strict',
    path: '/'
  })

  return {
    user: session.user
  }
})
