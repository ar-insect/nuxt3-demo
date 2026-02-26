
<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200 pb-5 mb-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">Products</h1>
      <p class="mt-2 text-lg text-gray-500">
        Browse our latest collection of premium products.
      </p>
    </div>

    <BaseLoading :loading="pending" text="Loading products..." />

    <div v-if="!pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <BaseCard v-for="product in products" :key="product.id" class="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 mb-4 h-48 flex items-center justify-center p-4">
          <img 
            :src="product.image" 
            :alt="product.title" 
            class="h-full w-full object-contain object-center group-hover:opacity-75"
          />
        </div>
        
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
                <NuxtLink :to="`/products/${product.id}`">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.title }}
                </NuxtLink>
              </h3>
            </div>
            <p class="mt-1 text-sm text-gray-500 capitalize">{{ product.category }}</p>
            <div class="mt-2 flex items-center">
              <div class="flex items-center">
                <svg v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating.rate > rating ? 'text-yellow-400' : 'text-gray-200', 'h-4 w-4 flex-shrink-0']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p class="ml-1 text-xs text-gray-500">{{ product.rating.count }} reviews</p>
            </div>
          </div>
          
          <div class="mt-4 flex items-center justify-between">
            <p class="text-lg font-bold text-gray-900">${{ product.price }}</p>
            <NuxtLink :to="`/products/${product.id}`">
              <BaseButton size="sm" variant="secondary">View Details</BaseButton>
            </NuxtLink>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts, type Product } from '~/composables/useProducts'

const { getProducts } = useProducts()

const { data: products, pending } = await useAsyncData<Product[]>('products', () => getProducts(), {
  default: () => []
})
</script>
