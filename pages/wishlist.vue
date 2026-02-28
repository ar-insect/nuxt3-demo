<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200 pb-5 mb-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">我的收藏</h1>
    </div>

    <div v-if="wishlistItems.length === 0" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">您的收藏夹是空的</h3>
      <p class="mt-1 text-sm text-gray-500">将您喜欢的商品保存到收藏夹。</p>
      <div class="mt-6">
        <NuxtLink to="/products">
          <BaseButton variant="primary">浏览商品</BaseButton>
        </NuxtLink>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <BaseCard v-for="product in wishlistItems" :key="product.id" class="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <div class="relative">
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 mb-4 h-48 flex items-center justify-center p-4">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-contain object-center group-hover:opacity-75"/>
          </div>
          <button 
            @click="removeFromWishlist(product.id)" 
            class="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm text-red-500 hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="flex-1 flex flex-col justify-between">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
            <NuxtLink :to="`/products/${product.id}`">{{ product.title }}</NuxtLink>
          </h3>
          <div class="mt-4 flex items-center justify-between">
            <p class="text-lg font-bold text-gray-900">${{ product.price }}</p>
            <BaseButton size="sm" variant="secondary" @click="handleAddToCart(product)">加入购物车</BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

const { wishlistItems, removeFromWishlist } = useWishlist()
const { addToCart } = useCart()
const toast = useToast()

useSeoMeta({
  title: '我的收藏',
  description: '查看您收藏的商品。'
})

const handleAddToCart = (product: Product) => {
  addToCart(product)
  toast.success('已加入购物车！')
}
</script>
