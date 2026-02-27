<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-100 supports-[backdrop-filter]:bg-white/60">
    <div class="w-full px-6 h-16 flex items-center justify-between">
      <!-- Left Side: Logo & Navigation -->
      <div class="flex items-center gap-8">
        <!-- Logo Area -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
            N
          </div>
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Nuxt3 Demo
          </span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-1">
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
          <NuxtLink to="/cart" class="relative p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span v-if="cartCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-indigo-100 transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
              {{ cartCount }}
            </span>
          </NuxtLink>
        </div>

        <!-- User Actions -->
        <div v-if="user" class="flex items-center gap-3">
          <NuxtLink to="/profile" class="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
            <img v-if="user.avatar" :src="user.avatar" class="w-8 h-8 rounded-full border border-gray-200" alt="User" />
            <span>{{ user.name }}</span>
          </NuxtLink>
          <button 
            @click="logout" 
            class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
        <NuxtLink 
          v-else 
          to="/login"
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-lg shadow-green-500/30 transition-all hover:-translate-y-0.5"
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

const links = [
  { to: '/', text: '首页' },
  { to: '/components-demo', text: '组件' },
  { to: '/products', text: '商品' },
  { to: '/user', text: '用户' },
  { to: '/utils-demo', text: '工具' },
  { to: '/http-demo', text: 'HTTP' },
  { to: '/ssr-demo', text: 'SSR' },
  { to: '/plugins-demo', text: '插件' },
  { to: '/types-demo', text: '类型' },
  { to: '/pinia-demo', text: 'Pinia' },
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
