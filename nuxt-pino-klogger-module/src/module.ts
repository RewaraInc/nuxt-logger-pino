import { defineNuxtModule, addPlugin, createResolver, addServerHandler } from '@nuxt/kit'
import { defu } from 'defu'
import type { LoggerOptions } from 'pino'

export interface ModuleOptions {
  server: LoggerOptions | boolean
  client: LoggerOptions | boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-pino-klogger',
    configKey: 'pinoLogger',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    server: {},
    client: {
      level: 'warn',
      browser: {
        asObject: true,
        write: (o) => {
          const level = o.level === 50 ? 'error' : 
                       o.level === 40 ? 'warn' : 
                       o.level === 30 ? 'info' : 'debug'
          console[level](`[PINO] ${o.msg}`)
        }
      }
    }
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
      // Pass options to runtime config
    nuxt.options.runtimeConfig.public.pinoLogger = {
      client: options.client
    }
    
    nuxt.options.runtimeConfig.pinoLogger = {
      server: options.server
    }
    if (options.server !== false) {

      nuxt.hook('nitro:config', (nitroConfig) => {
        nitroConfig.runtimeConfig = nitroConfig.runtimeConfig || {}
        nitroConfig.runtimeConfig.pinoLogger = {
          server: options.server
        }
        nitroConfig.plugins = nitroConfig.plugins || []
        //console.log('In nitro:config - nitroConfig.plugins: ', nitroConfig.plugins)
        const pluginPath = resolver.resolve('./runtime/server/plugins/pino.server.ts')
        nitroConfig.plugins.push(pluginPath)
        //console.log('In nitro:config - Registered: ', pluginPath)
        //console.log('In nitro:config - nitroConfig.plugins: ', nitroConfig.plugins)
        nitroConfig.virtual = nitroConfig.virtual || {}
        nitroConfig.virtual['#pino-klogger'] = `export { logger } from '${resolver.resolve('./runtime/server/utils/logger.ts')}'`
      })
    }
    
    if (options.client !== false) {
      addPlugin({
        src: resolver.resolve('./runtime/client/plugins/pino.client.ts'),
        mode: 'client'
      })
    }
    
    nuxt.hook('prepare:types', (opts) => {
      opts.references.push({ path: resolver.resolve('./types/index.d.ts') })
    })
  }
})
