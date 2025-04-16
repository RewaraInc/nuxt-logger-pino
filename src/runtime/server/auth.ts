import type { AuthUser, AuthSession } from './types'

export const validatedCounts = {
  'demo-session-token': 0,
}

export const validateCredentials = (
  username: string,
  password: string
): boolean => {
  return username === 'demo' && password === 'demo123'
}

export const createSession = (): AuthSession => {
  return {
    user: {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      roles: ['user'],
    },
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    token: 'demo-session-token',
    validatedCount: 0,
  }
}

export const verifySession = (token: string): boolean => {
  console.log('Verifying session with token:', token)
  validatedCounts['demo-session-token'] = (validatedCounts['demo-session-token'] || 0) + 1
  console.log('Validated count:', validatedCounts['demo-session-token'])
  return token === 'demo-session-token'
}

export const getValidatedCount = (): any => {
  return validatedCounts
}
