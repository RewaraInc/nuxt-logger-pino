import type { AuthUser } from '#nuxt-starter-module/server'

export const useAuth = () => {
  const user = useState<AuthUser | null>('auth:user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  
  const login = async (credentials: { username: string; password: string }) => {
    try {
      await $fetch('/api/login', {
        method: 'POST',
        body: credentials
      })
      user.value = await $fetch('/api/session')
      return true
    } catch (e) {
      user.value = null
      return false
    }
  }
  
  const logout = async () => {
    await $fetch('/api/logout', { method: 'POST' })
    user.value = null
  }
  
  const refresh = async () => {
    try {
      user.value = await $fetch('/api/session')
    } catch {
      user.value = null
    }
  }

  // Initialize auth state
  if (process.client) {
    refresh()
  }
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    refresh
  }
}
