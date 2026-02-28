<template>
  <ThemeProvider :theme="styledTheme">
    <div class="app-container">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ThemeSettings />
    </div>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ThemeProvider } from 'vue3-styled-components'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
const { user } = useAuth()

// 配置全局 Meta
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt3 演示` : 'Nuxt3 演示 - 现代化电商模板'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'charset', content: 'utf-8' },
    { name: 'description', content: '基于 Nuxt 3 构建的现代化电商演示项目，包含 SSR、模块化架构、全局状态管理等最佳实践。' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

// 初始化主题
const initTheme = async () => {
  if (user.value?.id) {
    await themeStore.fetchTheme(user.value.id.toString())
  }
  themeStore.applyTheme()
}

// 在服务端和客户端都执行
await initTheme()

// 监听用户登录状态变化，重新加载主题
watch(() => user.value?.id, async (newId) => {
  if (newId) {
    await themeStore.fetchTheme(newId.toString())
  } else {
    themeStore.resetTheme()
  }
})

// 适配 styled-components 的主题对象
const styledTheme = computed(() => ({
  primary: themeStore.theme.primaryColor,
  secondary: '#000000',
  borderRadius: themeStore.theme.borderRadius
}))
</script>

<style>
:root {
  --primary-color: #3b82f6;
  --bg-color: #ffffff;
  --text-color: #1f2937;
  --border-radius: 0.5rem;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>
