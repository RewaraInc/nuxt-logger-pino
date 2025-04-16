import { defineNuxtModule, addComponent, addImports, createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'

function exportPages(nuxt: any, resolve: any, moduleName: string) {
  nuxt.hook('pages:extend', (pages) => {
    pages.push({
      name: 'SessionStats',
      path: `/${moduleName}/SessionStats`,
      file: resolve('./pages/SessionStats.vue')
    })
  })
}


export default defineNuxtModule({
  meta: {
    name: 'nuxt-starter-module',
    configKey: 'starterModule'
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add composables
    addImports({
      name: 'useAuth',
      from: resolve('./composables/useAuth')
    })

    // Add components
    addComponent({
      name: 'StarterButton',
      filePath: resolve('./components/StarterButton.vue')
    })

    exportPages(nuxt, resolve, 'nuxt-starter-module')
    // Add virtual imports
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.virtual = nitroConfig.virtual || {}
      nitroConfig.virtual['#nuxt-starter-module/server'] = `
        export * from '${resolve('./runtime/server/auth')}'
        export * from '${resolve('./runtime/server/types')}'
      `
    })

    // Add runtime config
    nuxt.options.runtimeConfig.public.starterModule = {
      version: '1.0.0'
    }
  }
})
