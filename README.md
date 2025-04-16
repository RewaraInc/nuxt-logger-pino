# Nuxt Starter Module

A complete starter module with authentication and testing capabilities.

## Features

- Secure client-side authentication
- Cookie-based sessions
- Protected API routes
- Example components and pages
- Ready-to-use playground

## If you make a change in module, you need to run 'npm install'. 
### You may also need to cleanup a few folders using cleanup.bat 

## Getting Started

1. Install dependencies:
```bash
npm install
npm run dev
```

2. Test credentials:
- Username: `demo`
- Password: `demo123`

## Structure

- `src/` - Module code
- `playground/` - Development environment

## Endpoints

- `POST /api/login` - Authenticate user
- `POST /api/logout` - End session
- `GET /api/session` - Check auth status

## Publishing

```bash
npm run build
npm publish
```


# Set permissions
```
chmod -R 755 nuxt-starter-module

echo "Nuxt starter module created successfully!"
echo "To get started:"
echo "1. cd nuxt-starter-module"
echo "2. npm install"
echo "3. npm run dev"
```
