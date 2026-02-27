
<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200 pb-5 mb-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">Products</h1>
      <p class="mt-2 text-lg text-gray-500">
        Browse our latest collection of premium products.
      </p>
    </div>

    <div class="mb-8 space-y-4 border border-gray-200 bg-white p-4" :style="{ borderRadius: 'var(--border-radius)' }">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex-1">
          <BaseInput v-model="searchText" placeholder="Search products..." />
        </div>
        <div class="flex gap-2">
          <BaseButton variant="outline" @click="applySearch">Search</BaseButton>
          <BaseButton variant="secondary" @click="clearFilters">Clear</BaseButton>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="px-3 py-1.5 text-sm border border-gray-200 bg-white hover:bg-gray-50"
          :style="{ borderRadius: 'var(--border-radius)' }"
          :class="!activeCategory ? 'bg-[var(--primary-color)]/10 border-[var(--primary-color)]/30 text-[var(--primary-color)] font-medium' : ''"
          @click="setCategory(undefined)"
        >
          全部
        </button>
        <button
          v-for="c in categories"
          :key="c"
          type="button"
          class="px-3 py-1.5 text-sm border border-gray-200 bg-white hover:bg-gray-50 capitalize"
          :style="{ borderRadius: 'var(--border-radius)' }"
          :class="activeCategory === c ? 'bg-[var(--primary-color)]/10 border-[var(--primary-color)]/30 text-[var(--primary-color)] font-medium' : ''"
          @click="setCategory(c)"
        >
          {{ c }}
        </button>
      </div>

      <div v-if="activeCategory || activeQuery" class="text-sm text-gray-600">
        当前筛选：
        <span v-if="activeCategory" class="font-medium text-gray-900">{{ activeCategory }}</span>
        <span v-if="activeCategory && activeQuery"> · </span>
        <span v-if="activeQuery" class="font-medium text-gray-900">“{{ activeQuery }}”</span>
        <span class="ml-2 text-gray-400">({{ filteredProducts.length }} 件)</span>
      </div>
    </div>

    <BaseLoading :loading="pending" text="Loading products..." />

    <div v-if="!pending && filteredProducts.length === 0" class="py-16 text-center">
      <div class="text-lg font-semibold text-gray-900">没有找到符合条件的商品</div>
      <div class="mt-2 text-sm text-gray-600">试试清空筛选条件，或换个关键词</div>
      <div class="mt-6 flex justify-center">
        <BaseButton variant="secondary" @click="clearFilters">清空筛选</BaseButton>
      </div>
    </div>

    <div v-else-if="!pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <BaseCard v-for="product in filteredProducts" :key="product.id" class="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
        <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 mb-4 h-48 flex items-center justify-center p-4" :style="{ borderTopLeftRadius: 'var(--border-radius)', borderTopRightRadius: 'var(--border-radius)' }">
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

const route = useRoute()
const router = useRouter()
const { getProducts } = useProducts()

const { data: products, pending } = await useAsyncData<Product[]>('products', () => getProducts(), {
  default: () => []
})

const searchText = ref<string>((route.query.q as string) || '')

watch(
  () => route.query.q,
  (q) => {
    searchText.value = (q as string) || ''
  }
)

const activeCategory = computed<string | undefined>(() => {
  const v = route.query.category
  return typeof v === 'string' && v.trim() ? v : undefined
})

const activeQuery = computed<string>(() => {
  const v = route.query.q
  return typeof v === 'string' ? v.trim() : ''
})

const categories = computed(() => {
  const set = new Set(products.value.map(p => p.category))
  return [...set].sort((a, b) => a.localeCompare(b))
})

const filteredProducts = computed(() => {
  const category = activeCategory.value
  const q = activeQuery.value.toLowerCase()
  return products.value.filter((p) => {
    const okCategory = category ? p.category === category : true
    const okQ = q
      ? `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(q)
      : true
    return okCategory && okQ
  })
})

const setCategory = (category?: string) => {
  router.push({
    path: '/products',
    query: {
      ...route.query,
      category: category || undefined
    }
  })
}

const applySearch = () => {
  const q = searchText.value.trim()
  router.push({
    path: '/products',
    query: {
      ...route.query,
      q: q || undefined
    }
  })
}

const clearFilters = () => {
  router.push({ path: '/products' })
}
</script>
