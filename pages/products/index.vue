
<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div class="border-b border-gray-200 pb-5 mb-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">商品列表</h1>
      <p class="mt-2 text-lg text-gray-500">
        浏览我们要选的优质商品。
      </p>
    </div>

      <!-- Search and Filter -->
      <div class="mb-8 flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <BaseInput
            v-model="searchText"
            placeholder="搜索商品..."
            clearable
            @clear="searchText = ''"
          >
            <template #prefix>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </BaseInput>
        </div>
        <div class="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <BaseButton
            :variant="!activeCategory ? 'primary' : 'outline'"
            @click="setCategory()"
          >
            全部
          </BaseButton>
          <BaseButton
            v-for="cat in categories"
            :key="cat"
            :variant="activeCategory === cat ? 'primary' : 'outline'"
            @click="setCategory(cat)"
            class="whitespace-nowrap capitalize"
          >
            {{ categoryLabels[cat] || cat }}
          </BaseButton>
          <BaseButton
            v-if="activeCategory || activeQuery"
            variant="ghost"
            class="text-red-600 hover:text-red-700 hover:bg-red-50"
            @click="clearFilters"
          >
            清除
          </BaseButton>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>

      <!-- Product Grid -->
      <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <BaseCard
          v-for="product in products"
          :key="product.id"
          class="h-full flex flex-col hover:shadow-lg transition-shadow duration-300"
          :style="{ borderRadius: 'var(--border-radius)' }"
        >
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 rounded-t-lg relative group">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
              ${{ product.price }}
            </div>
          </div>
          <div class="p-4 flex-1 flex flex-col">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-medium text-gray-900 line-clamp-1" :title="product.title">
                <span v-html="highlightText(product.title, activeQuery)"></span>
              </h3>
            </div>
            <p class="text-sm text-gray-500 mb-4 line-clamp-2 flex-1" :title="product.description">
              <span v-html="highlightText(product.description, activeQuery)"></span>
            </p>
            <div class="mt-auto flex gap-2">
              <NuxtLink
                :to="`/products/${product.id}`"
                class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--primary-color)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                :style="{ borderRadius: 'var(--border-radius)' }"
              >
                查看详情
              </NuxtLink>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">未找到商品</h3>
        <p class="text-gray-500">
          尝试调整搜索或筛选条件以找到您想要的商品。
        </p>
        <BaseButton
          v-if="activeQuery || activeCategory"
          variant="outline"
          class="mt-4"
          @click="clearFilters"
        >
          清除所有筛选
        </BaseButton>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1 && !pending && products.length > 0" class="mt-8 flex justify-center gap-2">
        <BaseButton
          variant="outline"
          :to="page > 1 ? { path: '/products', query: { ...route.query, page: page - 1 } } : undefined"
          :disabled="page <= 1"
        >
          上一页
        </BaseButton>
        <div class="flex items-center gap-1">
          <NuxtLink
            v-for="p in totalPages"
            :key="p"
            :to="{ path: '/products', query: { ...route.query, page: p } }"
            class="w-10 h-10 flex items-center justify-center border text-sm font-medium transition-colors"
            :class="p === page 
              ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
            :style="{ borderRadius: 'var(--border-radius)' }"
          >
            {{ p }}
          </NuxtLink>
        </div>
        <BaseButton
          variant="outline"
          :to="page < totalPages ? { path: '/products', query: { ...route.query, page: page + 1 } } : undefined"
          :disabled="page >= totalPages"
        >
          下一页
        </BaseButton>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useProducts, type Product } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const { getProducts } = useProducts()

const page = computed(() => Number(route.query.page) || 1)
const limit = 4 // Show 4 products per page for demo

const activeCategory = computed<string | undefined>(() => {
  const v = route.query.category
  return typeof v === 'string' && v.trim() ? v : undefined
})

const activeQuery = computed<string>(() => {
  const v = route.query.q
  return typeof v === 'string' ? v.trim() : ''
})

// Use watch to react to route changes and refresh data
const { data, pending, refresh } = await useAsyncData(
  'products',
  () => getProducts(page.value, limit, activeCategory.value, activeQuery.value),
  {
    watch: [page, activeCategory, activeQuery], // Re-fetch when page, category or query changes
    default: () => ({ items: [], total: 0 })
  }
)

const products = computed(() => {
  return data.value?.items || []
})

const total = computed(() => data.value?.total || 0)
const totalPages = computed(() => Math.ceil(total.value / limit))

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
]

const categoryLabels: Record<string, string> = {
  "men's clothing": '男装',
  'jewelery': '珠宝配饰',
  'electronics': '电子产品',
  "women's clothing": '女装'
}

const searchText = ref<string>(activeQuery.value)

// Sync search text with route query
watch(activeQuery, (newVal) => {
  searchText.value = newVal
})

const setCategory = (category?: string) => {
  router.push({
    path: '/products',
    query: {
      ...route.query,
      category: category || undefined,
      page: 1 // Reset to page 1 on filter change
    }
  })
}

const clearFilters = () => {
  searchText.value = ''
  router.push({
    path: '/products',
    query: {
      page: 1
    }
  })
}

// Debounce search
let debounceTimer: NodeJS.Timeout | null = null
const debouncedSearch = (newVal: string) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    // Only update if query actually changed to avoid redundant pushes
    if (newVal !== activeQuery.value) {
      router.push({
        path: '/products',
        query: {
          ...route.query,
          q: newVal || undefined,
          page: 1 // Reset to page 1 on search
        }
      })
    }
  }, 300)
}

watch(searchText, (newVal) => {
  debouncedSearch(newVal)
})

const highlightText = (text: string, query: string) => {
  if (!query) return text
  // Escape special characters in query to avoid regex errors
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 text-gray-900 rounded-sm px-0.5">$1</mark>')
}
</script>
