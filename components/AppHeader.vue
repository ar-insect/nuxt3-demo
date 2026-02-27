<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-100 supports-[backdrop-filter]:bg-white/60">
    <div class="w-full px-6 h-16 flex items-center justify-between">
      <!-- Left Side: Logo & Navigation -->
      <div class="flex items-center gap-8">
        <!-- Logo Area -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20" style="border-radius: var(--border-radius);">
            N
          </div>
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Nuxt3 Demo
          </span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <ul class="flex items-center gap-1">
            <li v-for="link in mainLinks" :key="link.to">
              <NuxtLink 
                :to="link.to"
                class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-all duration-200"
                active-class="text-[var(--primary-color)] bg-[var(--primary-color)]/10 font-semibold shadow-sm"
                :style="{ borderRadius: 'var(--border-radius)' }"
              >
                {{ link.text }}
              </NuxtLink>
            </li>
            
            <!-- Demos Dropdown -->
            <li class="relative group">
              <button class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-all duration-200" :style="{ borderRadius: 'var(--border-radius)' }">
                演示
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div class="absolute top-full right-0 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div class="bg-white shadow-xl border border-gray-100 overflow-hidden py-1" :style="{ borderRadius: 'var(--border-radius)' }">
                  <NuxtLink 
                    v-for="link in demoLinks" 
                    :key="link.to"
                    :to="link.to"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-[var(--primary-color)]/10 hover:text-[var(--primary-color)]"
                    active-class="bg-[var(--primary-color)]/10 text-[var(--primary-color)] font-medium"
                  >
                    {{ link.text }}
                  </NuxtLink>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Right Side: Cart, Wishlist & User Actions -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Cart & Wishlist -->
        <div class="flex items-center gap-2 border-r border-gray-200 pr-4 mr-4">
          <NuxtLink to="/wishlist" class="relative p-2 text-gray-400 hover:text-red-500 transition-colors" title="Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="wishlistItems.length > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
              {{ wishlistItems.length }}
            </span>
          </NuxtLink>
          <NuxtLink to="/cart" class="relative p-2 text-gray-400 hover:text-[var(--primary-color)] transition-colors" title="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[var(--primary-color)] rounded-full">
              {{ cartCount }}
            </span>
          </NuxtLink>
        </div>

        <!-- User Actions -->
        <div v-if="user" class="flex items-center gap-3">
          <NuxtLink to="/profile" class="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-color)] transition-colors">
            <img v-if="user.avatar" :src="user.avatar" class="w-8 h-8 rounded-full border border-gray-200" alt="User" />
            <span>{{ user.name }}</span>
          </NuxtLink>
          <button 
            @click="logout" 
            class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
            :style="{ borderRadius: 'var(--border-radius)' }"
          >
            Logout
          </button>
        </div>
        <NuxtLink 
          v-else 
          to="/login"
          class="px-4 py-2 text-sm font-medium text-white bg-[var(--primary-color)] hover:opacity-90 shadow-lg shadow-[var(--primary-color)]/30 transition-all hover:-translate-y-0.5"
          :style="{ borderRadius: 'var(--border-radius)' }"
        >
          Login
        </NuxtLink>
      </div>

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
const { user, logout } = useAuth()
const { cartCount } = useCart()
const { wishlistItems } = useWishlist()

const mainLinks = [
  { to: '/', text: '首页' },
  { to: '/products', text: '商品' },
  { to: '/docs', text: '文档' },
]

const demoLinks = [
  { to: '/components-demo', text: 'UI 组件' },
  { to: '/pinia-demo', text: '状态管理 (Pinia)' },
  { to: '/http-demo', text: 'HTTP 请求' },
  { to: '/ssr-demo', text: 'SSR 渲染' },
  { to: '/plugins-demo', text: '插件机制' },
  { to: '/utils-demo', text: '工具函数' },
  { to: '/types-demo', text: 'TypeScript 类型' },
  { to: '/tsx-demo', text: 'TSX 支持' },
  { to: '/styled-demo', text: 'Styled Components' },
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
