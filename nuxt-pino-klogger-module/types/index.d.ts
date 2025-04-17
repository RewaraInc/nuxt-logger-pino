import type { Logger } from 'pino'

declare module '#app' {
  interface NuxtApp {
    $logger: Logger
  }
}

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    pinoLogger?: {
      server?: any
      client?: any
    }
  }
  interface PublicRuntimeConfig {
    pinoLogger?: {
      client?: any
    }
  }
}

declare module 'nitropack' {
  interface NitroApp {
    logger: Logger
  }
  interface NitroRuntimeHooks {
    'request': (event: H3Event) => void
  }
}

declare module 'h3' {
  interface H3EventContext {
    logger: Logger
  }
}

export {}
