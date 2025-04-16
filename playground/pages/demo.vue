<template>
  <div class="demo-container">
    <h1>Demo Page</h1>
    <StarterButton @click="showAlert">Click Me</StarterButton>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
const message = ref('')

const showAlert = () => {
  message.value = 'Button clicked!'
}
</script>

<style scoped>
.demo-container {
  padding: 2rem;
}
</style>
