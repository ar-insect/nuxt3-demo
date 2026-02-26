import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // any custom vitest config you need
  test: {
    environment: 'happy-dom',
    globals: true,
    css: false
  }
})
