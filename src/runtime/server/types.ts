export interface AuthUser {
  id: string
  name: string
  email: string
  roles: string[]
}

export interface AuthSession {
  user: AuthUser
  expiresAt: string
  token: string
  validatedCount: number
}
