# Nuxt Pino Logger

A module to log into file and console.

module name: nuxt-pino-klogger

## Configuration
### Option 1:
You can define these environment variables as shown below:
```
LOGS_DIR=logs
APPLICATION_NAME=application
LOG_LEVEL=info
```

### Option 2:
Or configure in your nuxt.config.ts
```
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
```


The logger logs that it has a created a logger with options, if you want to supress it then
define these env var:
```
SUPRESS_LOG_ANNOUNCEMENT=true
```

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
