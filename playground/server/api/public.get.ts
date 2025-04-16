export default defineEventHandler(() => {
  return {
    message: 'This is public data',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }
})
