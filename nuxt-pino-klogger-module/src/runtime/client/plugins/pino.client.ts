import pino from 'pino'
import type { LoggerOptions } from 'pino'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const options = config.public.pinoLogger?.client as LoggerOptions
  
  if (!options) return
  
  const logger = pino(options)
  
  return {
    provide: {
      logger
    }
  }
})
