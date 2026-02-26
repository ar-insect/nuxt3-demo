<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-100 supports-[backdrop-filter]:bg-white/60">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo Area -->
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
          N
        </div>
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Nuxt3 Demo
        </span>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.to">
            <NuxtLink 
              :to="link.to"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
              active-class="text-green-600 bg-green-50 font-semibold shadow-sm"
            >
              {{ link.text }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Mobile Menu Button (Placeholder) -->
      <button class="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const links = [
  { to: '/', text: '首页' },
  { to: '/components-demo', text: '组件' },
  { to: '/user', text: '用户' },
  { to: '/utils-demo', text: '工具' },
  { to: '/http-demo', text: 'HTTP' },
  { to: '/ssr-demo', text: 'SSR' },
  { to: '/plugins-demo', text: '插件' },
  { to: '/types-demo', text: '类型' },
  { to: '/tsx-demo', text: 'TSX' },
  { to: '/styled-demo', text: 'Styled' },
]
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
