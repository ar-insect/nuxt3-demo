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
import { useUserStore } from '~/stores/user'

const themeStore = useThemeStore()
const userStore = useUserStore()

// 初始化主题
onMounted(async () => {
  themeStore.applyTheme()
  if (userStore.currentUser?.id) {
    await themeStore.fetchTheme(userStore.currentUser.id.toString())
  }
})

// 监听用户登录状态变化，重新加载主题
watch(() => userStore.currentUser?.id, async (newId) => {
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
