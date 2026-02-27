// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 4000
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
  routeRules: {
    // Enable ISR for docs page
    '/docs': { isr: 3600 }, // Cache for 1 hour
    '/products/**': { isr: 3600 }, // Also good for products but let's stick to docs request
  },
  nitro: {
    storage: {
      cache: {
        driver: 'redis',
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || '',
        db: Number(process.env.REDIS_DB) || 0
      }
    },
    devStorage: {
      cache: {
        driver: 'redis',
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || '',
        db: Number(process.env.REDIS_DB) || 0
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
