import { logger } from '#pino-klogger'

export default defineEventHandler((event) => {
  const random = Math.floor(Math.random() * 10000);
  console.log(`Using console.log in middleware ${random} (Console): `, event.path)
  event.context.logger.info(`Using event.context.logger in middleware ${random}: ${event.path}`)
  // Uncommenting the line below will give error:
  // Cannot access 'nitroApp$1' before initialization
  // logger.info(`Using logger in middleware ${random}: ${event.path}`)
})
