# Nuxt Pino Logger Playground

This playground demonstrates the usage of the `nuxt-pino-klogger` module.

## Usage Examples

### 1. Client-side Logging
```vue
<script setup>
const { $logger } = useNuxtApp()
$logger.info('Client message')
</script>
```

### 2. Server API Routes
```ts
// server/api/example.ts
export default defineEventHandler((event) => {
  event.context.logger.info('API called')
})
```

### 3. Server Middleware
```ts
// server/middleware/log.ts
export default defineEventHandler((event) => {
  event.context.logger.info(`Request to ${event.path}`)
})
```

### 4. Server Utilities
```ts
import { logger } from '#pino-klogger'
logger.info('Server started')
```

### 5. Composable Usage
```ts
// composables/useLogger.ts
export function useLogger() {
  const { $logger } = useNuxtApp()
  return $logger
}
```

## Features Demonstrated

1. Client-side logging with different levels
2. Server-side request-scoped logging
3. Error logging in API routes
4. Middleware logging
5. Composable integration
6. Type-safe usage

## Running the Playground

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Visit `http://localhost:3000` and interact with the buttons to see logging in action.
