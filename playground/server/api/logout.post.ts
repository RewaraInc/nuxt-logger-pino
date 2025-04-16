export default defineEventHandler(async (event) => {
  deleteCookie(event, 'session_token')
  return { success: true }
})
