export default defineEventHandler(async (event) => {
  const session = await $fetch('/api/session', {
    headers: event.headers
  }).catch(() => null)

  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  return {
    message: 'This is protected data',
    user: session.user,
    accessedAt: new Date().toISOString()
  }
})
