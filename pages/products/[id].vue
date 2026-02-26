
<template>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <BaseLoading :loading="pending" text="Loading product details..." />

    <div v-if="error" class="text-center py-12">
      <h3 class="mt-2 text-sm font-medium text-gray-900">Product not found</h3>
      <div class="mt-6">
        <NuxtLink to="/products">
          <BaseButton variant="primary">Go back to products</BaseButton>
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="product" class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
      <!-- Image gallery -->
      <div class="flex flex-col-reverse">
        <div class="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
          <img 
            :src="product.image" 
            :alt="product.title" 
            class="w-full h-full object-center object-contain p-8"
          />
        </div>
      </div>

      <!-- Product info -->
      <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.title }}</h1>
        
        <div class="mt-3">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl text-gray-900">${{ product.price }}</p>
        </div>

        <!-- Reviews -->
        <div class="mt-3">
          <h3 class="sr-only">Reviews</h3>
          <div class="flex items-center">
            <div class="flex items-center">
              <svg v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating.rate > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="sr-only">{{ product.rating.rate }} out of 5 stars</p>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="sr-only">Description</h3>
          <div class="text-base text-gray-700 space-y-6" v-html="product.description" />
        </div>
        
        <div class="mt-6 flex items-center">
          <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 capitalize">
            {{ product.category }}
          </span>
        </div>

        <div class="mt-10 flex sm:flex-col1">
          <BaseButton 
            size="lg" 
            block 
            @click="handleAddToCart"
            :loading="addingToCart"
          >
            Add to bag
          </BaseButton>
          
          <button 
            type="button" 
            @click="handleToggleWishlist"
            class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
            :class="{ 'text-red-500 hover:text-red-600': product && isInWishlist(product.id) }"
          >
            <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" :fill="product && isInWishlist(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="sr-only">Add to favorites</span>
          </button>
        </div>
        
        <div class="mt-8 border-t border-gray-200 pt-8">
           <NuxtLink to="/products" class="text-indigo-600 hover:text-indigo-500 font-medium flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
             </svg>
             Back to Products
           </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts, type Product } from '~/composables/useProducts'

const route = useRoute()
const { getProductById } = useProducts()
const toast = useToast()
const { addToCart } = useCart()
const { toggleWishlist, isInWishlist } = useWishlist()

const id = parseInt(route.params.id as string)

const { data: product, pending } = await useAsyncData<Product | undefined>(
  `product-${id}`,
  () => {
    if (isNaN(id)) return Promise.resolve(undefined)
    return getProductById(id)
  }
)

const error = computed(() => !pending.value && !product.value)
const addingToCart = ref(false)

const handleAddToCart = () => {
  if (!product.value) return
  
  addingToCart.value = true
  setTimeout(() => {
    if (product.value) {
      addToCart(product.value)
      toast.success(`Added ${product.value.title} to cart!`)
    }
    addingToCart.value = false
  }, 500)
}

const handleToggleWishlist = () => {
  if (product.value) {
    toggleWishlist(product.value)
  }
}
</script>
