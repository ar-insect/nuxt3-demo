import fs from 'node:fs'
import path from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  // Sync README.md to content/index.md
  hooks: {
    'build:before': () => {
      const readmePath = path.resolve(process.cwd(), 'README.md')
      const contentPath = path.resolve(process.cwd(), 'content/index.md')
      if (fs.existsSync(readmePath)) {
        fs.copyFileSync(readmePath, contentPath)
      }
    },
    'builder:watch': (event, relativePath) => {
      if (relativePath === 'README.md') {
        const readmePath = path.resolve(process.cwd(), 'README.md')
        const contentPath = path.resolve(process.cwd(), 'content/index.md')
        if (fs.existsSync(readmePath)) {
          fs.copyFileSync(readmePath, contentPath)
          // Touch content/index.md to trigger HMR if needed, though copy should be enough
        }
      }
    }
  },
  sourcemap: {
    server: true,
    client: true
  },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components/common',
      pathPrefix: false
    },
    '~/components'
  ],
  extends: [
    './modules/user'
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/content',
    // '@nuxtjs/tailwindcss'
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  experimental: {
    appManifest: true
  },
  // Configure MDC (Markdown Components) for Nuxt Content
  mdc: {
    highlight: {
      theme: 'github-dark',
      preload: ['ts', 'js', 'css', 'json', 'vue', 'bash', 'html', 'md', 'yaml']
    }
  },
  routeRules: {
    // Enable ISR (Incremental Static Regeneration)
    // Only enable in production to allow HMR in development
    '/docs': { swr: process.env.NODE_ENV === 'production' },
    '/products/**': { swr: process.env.NODE_ENV === 'production' ? 3600 : false },
  },
  nitro: {
    storage: {
      cache: {
        driver: 'redis',
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || '',
        db: Number(process.env.REDIS_DB) || 0,
        base: 'nitro:cache:'
      }
    },
    devStorage: {
      // Use memory driver for development to avoid persistent caching issues
      cache: {
        driver: 'memory'
      }
    }
  },
  runtimeConfig: {
    // 服务端私有配置
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || '',
      db: Number(process.env.REDIS_DB) || 0
    },
    public: {
      // 客户端公共配置
    }
  },
  typescript: {
    shim: false
  }
})
