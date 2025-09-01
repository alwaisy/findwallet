# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Nuxt.js 4.x application called "findwallet-pk" built with TypeScript and modern web development tools. The project is a minimal Nuxt starter that has been configured with content management, ESLint, fonts, icons, and image optimization capabilities.

## Development Commands

### Package Management
This project uses Bun as the package manager (indicated by `bun.lock` file):

```bash
# Install dependencies
bun install

# Alternative package managers also supported
npm install
pnpm install
yarn install
```

### Development Server
Start the development server on `http://localhost:3000`:

```bash
# Primary method (using Bun)
bun run dev

# Alternative methods
npm run dev
pnpm dev
yarn dev
```

### Building and Production

```bash
# Build for production
bun run build
npm run build

# Generate static site
bun run generate
npm run generate

# Preview production build locally
bun run preview
npm run preview
```

### Linting
ESLint is configured with Nuxt's recommended settings:

```bash
# Run ESLint (through Nuxt's built-in linting)
npx eslint .

# Auto-fix linting issues
npx eslint . --fix
```

## Architecture Overview

### Core Structure
- **`app/app.vue`**: Root application component using Nuxt's minimal structure
- **`nuxt.config.ts`**: Main configuration file with essential modules enabled
- **`public/`**: Static assets (favicon, robots.txt)
- **`.nuxt/`**: Auto-generated Nuxt development files (do not modify)

### Nuxt Modules Enabled
The application is configured with the following Nuxt modules:

1. **@nuxt/content**: Content management system for markdown/MDX files
2. **@nuxt/eslint**: Integrated ESLint support with Nuxt-specific rules
3. **@nuxt/fonts**: Optimized web font loading
4. **@nuxt/icon**: Icon system integration
5. **@nuxt/image**: Image optimization and processing

### TypeScript Configuration
- Uses Nuxt 4.x TypeScript setup with project references
- Configuration split across multiple generated tsconfig files in `.nuxt/`
- Main `tsconfig.json` references auto-generated configurations

### Development Patterns
This is a minimal starter project. As development progresses, typical Nuxt.js directory structure will likely emerge:
- `pages/` for file-based routing
- `components/` for Vue components
- `layouts/` for application layouts
- `composables/` for reusable logic
- `content/` for markdown content (enabled via @nuxt/content)
- `server/` for API routes
- `plugins/` for Vue/Nuxt plugins

### Build System
- **Bun** as the primary package manager and runtime
- **Nuxt 4.x** build system with Vite under the hood
- **ESLint** for code quality with Nuxt-specific rules
- Auto-generation of TypeScript definitions and configurations

## Key Configuration Files
- `nuxt.config.ts`: Central configuration for modules, build options, and development settings
- `eslint.config.mjs`: ESLint configuration extending Nuxt's defaults
- `package.json`: Dependencies and scripts definition
- `tsconfig.json`: TypeScript project references to auto-generated configs
