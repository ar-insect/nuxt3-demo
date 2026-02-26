<template>
  <ThemeProvider :theme="theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { ThemeProvider } from 'vue3-styled-components'

const theme = {
  primary: '#00dc82',
  secondary: '#000000'
}
</script>
