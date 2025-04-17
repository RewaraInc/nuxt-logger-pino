import pino from 'pino'
import type { LoggerOptions } from 'pino'
import { defineNitroPlugin } from '#imports'
import { useRuntimeConfig } from '#imports'
import fs from 'node:fs'

function createDafaultPinoLoggerOptions(){
  const logsDir = process.env.LOGS_DIR || 'logs'
  if (!fs.existsSync(logsDir))
  {
    fs.mkdirSync(logsDir)
  }
  const applicationName = process.env.APPLICATION_NAME || 'application'
  const logLevel = process.env.LOG_LEVEL || 'debug'
  return     {
    level: logLevel,
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            destination: `${logsDir}/${applicationName}.log`,
            mkdir: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            colorize: false, // <- disables ANSI color codes
          },
          level: logLevel
        },
        {
          target: 'pino-pretty',
          options: {
            destination: 1 // stdout
          },
          level: logLevel
        }
      ]
    }
  }

}


function createLogger(options: LoggerOptions) {
  try {
    if (options) {
      const retVal = pino(options)
      if (!(process.env.SUPRESS_LOG_ANNOUNCEMENT)) {
        retVal.info(`Using logging options: ${JSON.stringify(options)}`)
      }
      return retVal
    } else {
      const oo = createDafaultPinoLoggerOptions();
      const retVal = pino(oo)
      if (!(process.env.SUPRESS_LOG_ANNOUNCEMENT)) {
        retVal.info(`Using default logging options: ${JSON.stringify(oo)}`)
      }
      return retVal
    }
  }catch (e){
    console.error(e)
    return pino()
  }
}


export default defineNitroPlugin((nitroApp) => {
  console.log('Pino Nitro plugin initializing!')
  
  // Proper way to access runtime config in Nitro plugin
  const config = useRuntimeConfig()
    
  // Access your server options
  const options = config.pinoLogger?.server

  // if (!options) {
  //   console.log(`No Options found at config.pinoLogger.server. Using default.`)
  // }
  
  const logger = createLogger(options)
  //console.log('Pino logger created: ', logger)
  nitroApp.logger = logger
  
  nitroApp.hooks.hook('request', (event) => {
    //console.log('In nitroApp.hooks.hook request')
    event.context.logger = logger.child({
      requestId: event.context._requestId,
      path: event.path,
      timestamp: Date.now()
    })
  })

  // Add logger to all middleware contexts
  nitroApp.hooks.hook('middleware', (event) => {
    if (!event.context.logger) {
      event.context.logger = logger.child({
        requestId: event.context._requestId,
        path: event.path,
        middleware: true,
        timestamp: Date.now()
      })
    }
  })
  
  //console.log(`Pino logger initialized in server runtime middleware ${JSON.stringify(options)}`)
})


// export default defineNitroPlugin((nitroApp) => {
//   // Wait for runtime config to be ready
//   nitroApp.hooks.hook('nitro:init', (nitro) => {
//     const options = nitro.options.runtimeConfig.public.pinoLogger?.server
    
//     if (!options) {
//       console.warn('Pino logger server options not found in runtime config')
//       return
//     }

//     const logger = pino(options)
    
//     nitroApp.logger = logger
    
//     nitroApp.hooks.hook('request', (event) => {
//       event.context.logger = logger.child({
//         requestId: event.context._requestId,
//         path: event.path
//       })
//     })
//     console.log('Pino logger initialized in module runtime middleware')
//   })
// })