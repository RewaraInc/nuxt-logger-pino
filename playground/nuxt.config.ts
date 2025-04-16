export default defineNuxtConfig({
  modules: ['../src/module'],

  runtimeConfig: {
    sessionSecret: process.env.SESSION_SECRET || 'dev-secret-123',
    public: {
      appName: 'Starter Module Playground'
    }
  },

  nitro: {
    preset: 'node-server'
  },

  compatibilityDate: '2025-04-16'
})