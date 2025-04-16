<template>
  <div class="container">
    <header>
      <h1>{{ $config.public.appName }}</h1>
      <div class="auth-status">
        <span v-if="auth.isAuthenticated">
          Welcome, {{ auth.user?.name }}!
          <button @click="auth.logout()">Logout</button>
        </span>
        <NuxtLink v-else to="/login" class="login-btn">Login</NuxtLink>
      </div>
    </header>

    <main>
      <section class="card">
        <h2>Module Features</h2>
        <div class="features">
          <StarterButton @click="testPublic">Test Public API</StarterButton>
          <StarterButton 
            @click="testProtected" 
            :disabled="!auth.isAuthenticated">
            Test Protected API
          </StarterButton>
          <NuxtLink to="/demo" class="btn">Demo Page</NuxtLink>
          <NuxtLink to="/nuxt-starter-module/SessionStats" class="btn">SessionStats</NuxtLink>
        </div>
        <div class="results">
          <pre>{{ testResults || 'Run tests to see results...' }}</pre>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useAuth()
const testResults = ref('')

const testPublic = async () => {
  try {
    testResults.value = await $fetch('/api/public')
  } catch (e) {
    testResults.value = `Error: ${e.statusMessage}`
  }
}

const testProtected = async () => {
  try {
    testResults.value = await $fetch('/api/protected')
  } catch (e) {
    testResults.value = `Error: ${e.statusMessage}`
  }
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.auth-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card {
  padding: 2rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.features {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.results {
  margin-top: 2rem;
}

pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.login-btn, .btn {
  padding: 0.5rem 1rem;
  background: #00dc82;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
}

button {
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
