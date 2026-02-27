// modules/user/nuxt.config.ts
// 虽然在 extends 中不是必须的，但对于独立开发该模块很有用
import { resolve, dirname } from 'pathe'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  components: [
    {
      path: resolve(currentDir, 'components'),
      prefix: 'User',
      pathPrefix: false,
    },
  ],
})
