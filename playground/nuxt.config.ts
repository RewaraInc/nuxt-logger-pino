import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['../nuxt-pino-klogger-module/src/module'],

  pinoLogger: {
    server: {
      level: 'debug',
      redact: ['headers.authorization', 'password', 'token'],
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            options: {
              destination: `logs/testApp.log`,
              mkdir: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
              colorize: false, // <- disables ANSI color codes
            },
            level: 'debug'
          },
          {
            target: 'pino-pretty',
            options: {
              destination: 1 // stdout
            },
            level: 'debug'
          }
        ]
      }
    },
    client: {
      level: 'info'
    }
  },

  compatibilityDate: '2025-04-16'
})