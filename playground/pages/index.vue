<template>
  <div>
    <h1>Nuxt Pino Logger Playground</h1>
    <button @click="logMessages">Log Test Messages</button>
    <button @click="fetchApi">Call API Endpoint</button>
  </div>
</template>

<script setup>
const { $logger } = useNuxtApp()
const { log } = useLogger()

const logMessages = () => {
  $logger.info('Client info message')
  $logger.warn('Client warning message')
  $logger.error('Client error message')
  log('Message from composable')
}

const fetchApi = async () => {
  await $fetch('/api/test')
}
</script>
