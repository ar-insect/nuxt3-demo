<template>
  <div class="space-y-14">
    <section class="relative overflow-hidden border border-gray-100 bg-white shadow-sm" :style="{ borderRadius: 'var(--border-radius)' }">
      <div class="absolute inset-0 opacity-40" :style="{ background: `radial-gradient(1200px circle at 20% 20%, ${primaryTint} 0%, rgba(255,255,255,0) 45%), radial-gradient(900px circle at 90% 10%, rgba(16,185,129,0.20) 0%, rgba(255,255,255,0) 40%)` }"></div>
      <div class="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
        <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <div class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 backdrop-blur" :style="{ borderRadius: '999px' }">
              <SparklesIcon class="h-4 w-4" :style="{ color: 'var(--primary-color)' }" />
              今日上新 / 热门推荐
            </div>
            <h1 class="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              发现你喜欢的好物
            </h1>
            <p class="mt-4 max-w-2xl text-base text-gray-600 sm:text-lg">
              这里是一个 Nuxt 3 电商风格首页示例：商品推荐、分类入口、加入购物车与收藏。
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div class="w-full sm:flex-1">
                <BaseInput v-model="search" placeholder="搜索商品，例如：Backpack / Ring / Jacket" />
              </div>
              <div class="flex gap-3 items-center">
                <StyledTsxButton label="去逛逛" variant="primary" @click="goToProducts()" />
                <BaseButton size="md" variant="outline" @click="goToProducts({ q: search })">搜索</BaseButton>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-2">
              <button
                v-for="c in categoryCards"
                :key="c.key"
                class="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                :style="{ borderRadius: 'var(--border-radius)' }"
                @click="goToProducts({ category: c.key })"
              >
                <component :is="c.icon" class="h-4 w-4" :style="{ color: 'var(--primary-color)' }" />
                {{ c.label }}
              </button>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="bg-white p-5 shadow-sm ring-1 ring-gray-100" :style="{ borderRadius: 'var(--border-radius)' }">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center bg-[var(--primary-color)]/10" :style="{ borderRadius: 'var(--border-radius)' }">
                    <TruckIcon class="h-5 w-5" :style="{ color: 'var(--primary-color)' }" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">极速配送</div>
                    <div class="text-sm text-gray-600">下单后尽快发货</div>
                  </div>
                </div>
              </div>

              <div class="bg-white p-5 shadow-sm ring-1 ring-gray-100" :style="{ borderRadius: 'var(--border-radius)' }">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center bg-[var(--primary-color)]/10" :style="{ borderRadius: 'var(--border-radius)' }">
                    <TagIcon class="h-5 w-5" :style="{ color: 'var(--primary-color)' }" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">优惠精选</div>
                    <div class="text-sm text-gray-600">爆款低价专区</div>
                  </div>
                </div>
              </div>

              <div class="bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:col-span-2" :style="{ borderRadius: 'var(--border-radius)' }">
                <div class="flex items-center justify-between gap-4">
                  <div class="min-w-0">
                    <div class="text-sm font-semibold text-gray-900">你的购物车</div>
                    <div class="mt-1 text-sm text-gray-600">
                      已选 {{ cartCount }} 件商品，{{ wishlistItems.length }} 件收藏
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <NuxtLink to="/cart">
                      <BaseButton size="sm" variant="secondary">去结算</BaseButton>
                    </NuxtLink>
                    <NuxtLink to="/wishlist">
                      <BaseButton size="sm" variant="outline">看收藏</BaseButton>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">商品分类</h2>
          <p class="mt-1 text-gray-600">从分类开始，快速找到你想要的商品</p>
        </div>
        <NuxtLink to="/products" class="text-sm font-medium text-gray-700 hover:text-[var(--primary-color)]">
          查看全部 →
        </NuxtLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          v-for="c in categoryCards"
          :key="c.key"
          class="group flex items-start gap-3 border border-gray-200 bg-white p-5 text-left hover:border-[var(--primary-color)]/40 hover:shadow-sm"
          :style="{ borderRadius: 'var(--border-radius)' }"
          @click="goToProducts({ category: c.key })"
        >
          <div class="flex h-11 w-11 items-center justify-center bg-[var(--primary-color)]/10" :style="{ borderRadius: 'var(--border-radius)' }">
            <component :is="c.icon" class="h-6 w-6" :style="{ color: 'var(--primary-color)' }" />
          </div>
          <div class="min-w-0">
            <div class="text-base font-semibold text-gray-900 group-hover:text-[var(--primary-color)]">{{ c.label }}</div>
            <div class="mt-1 text-sm text-gray-600 line-clamp-2">{{ c.description }}</div>
            <div class="mt-3 text-xs font-medium text-gray-500">
              {{ c.count }} 件商品
            </div>
          </div>
        </button>
      </div>
    </section>

    <section class="space-y-6">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">推荐商品</h2>
          <p class="mt-1 text-gray-600">按评分与热度精选，支持加入购物车与收藏</p>
        </div>
        <NuxtLink to="/products" class="text-sm font-medium text-gray-700 hover:text-[var(--primary-color)]">
          去逛更多 →
        </NuxtLink>
      </div>

      <BaseLoading :loading="pending" text="Loading recommendations..." />

      <div v-if="!pending" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="p in recommended"
          :key="p.id"
          class="group relative flex flex-col border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          :style="{ borderRadius: 'var(--border-radius)' }"
        >
          <NuxtLink :to="`/products/${p.id}`" class="block flex-1">
            <div class="relative flex aspect-square items-center justify-center overflow-hidden bg-gray-50 p-6 transition-colors group-hover:bg-gray-100" :style="{ borderRadius: 'var(--border-radius)' }">
              <img :src="p.image" :alt="p.title" class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5"></div>
            </div>
            <div class="mt-4 space-y-2">
              <div class="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-[var(--primary-color)]">{{ p.title }}</div>
              <div class="flex items-center justify-between gap-3">
                <div class="text-lg font-bold text-gray-900">${{ p.price }}</div>
                <div class="flex items-center gap-1 text-xs text-gray-500">
                  <StarIcon class="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span class="font-medium text-gray-700">{{ p.rating.rate }}</span>
                  <span>({{ p.rating.count }})</span>
                </div>
              </div>
              <div class="text-xs text-gray-400 capitalize">{{ p.category }}</div>
            </div>
          </NuxtLink>

          <div class="mt-4 flex items-center gap-3 pt-4 border-t border-gray-50">
            <StyledButton :primary="true" class="!m-0 flex-1 !py-2 !text-sm font-medium shadow-sm hover:!shadow-md active:scale-95" @click="addToCartAndToast(p)">
              加入购物车
            </StyledButton>
            <button
              class="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-200 bg-white text-gray-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:scale-110 active:scale-90"
              :style="{ borderRadius: 'var(--border-radius)' }"
              @click="toggleWishlist(p)"
              :aria-label="isInWishlist(p.id) ? '取消收藏' : '加入收藏'"
              type="button"
            >
              <HeartIcon class="h-5 w-5" :class="{ 'fill-current text-red-500': isInWishlist(p.id) }" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="border border-gray-200 bg-white px-6 py-10" :style="{ borderRadius: 'var(--border-radius)' }">
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="flex items-start gap-3">
          <div class="flex h-10 w-10 items-center justify-center bg-[var(--primary-color)]/10" :style="{ borderRadius: 'var(--border-radius)' }">
            <ShoppingBagIcon class="h-5 w-5" :style="{ color: 'var(--primary-color)' }" />
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-900">丰富品类</div>
            <div class="mt-1 text-sm text-gray-600">基础电商结构：分类、列表、详情、购物车、收藏</div>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="flex h-10 w-10 items-center justify-center bg-[var(--primary-color)]/10" :style="{ borderRadius: 'var(--border-radius)' }">
            <ShieldCheckIcon class="h-5 w-5" :style="{ color: 'var(--primary-color)' }" />
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-900">安全示例</div>
            <div class="mt-1 text-sm text-gray-600">示例级数据与交互，不涉及真实支付与敏感信息</div>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="flex h-10 w-10 items-center justify-center bg-[var(--primary-color)]/10" :style="{ borderRadius: 'var(--border-radius)' }">
            <SparklesIcon class="h-5 w-5" :style="{ color: 'var(--primary-color)' }" />
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-900">可配置皮肤</div>
            <div class="mt-1 text-sm text-gray-600">主题色与圆角由 CSS 变量驱动，支持实时切换</div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-12 text-center text-white shadow-lg sm:px-12" :style="{ borderRadius: 'var(--border-radius)' }">
      <div class="absolute inset-0 opacity-20" :style="{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }"></div>
      <div class="relative z-10 mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">订阅新品通知</h2>
        <p class="mt-4 text-lg text-indigo-100">第一时间获取最新商品上架信息与限时优惠活动，不错过任何好物。</p>
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <input
            v-model="email"
            type="email"
            placeholder="请输入您的邮箱地址"
            class="w-full max-w-sm rounded-lg border-0 bg-white/10 px-5 py-3 text-white placeholder:text-indigo-200 backdrop-blur-sm focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            :style="{ borderRadius: 'var(--border-radius)' }"
          />
          <StyledButton :primary="false" class="!m-0 !py-3 !px-8 font-semibold shadow-lg active:scale-95" @click="subscribe">
            立即订阅
          </StyledButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  HeartIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
import { useProducts, type Product } from '~/composables/useProducts'
import StyledTsxButton from '~/components/StyledTsxButton'
import StyledButton from '~/components/StyledButton'

useHead({ title: '首页' })

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { addToCart, cartCount } = useCart()
const { wishlistItems, toggleWishlist, isInWishlist } = useWishlist()
const { getProducts } = useProducts()

const search = ref<string>((route.query.q as string) || '')
const email = ref('')

const subscribe = () => {
  if (!email.value) {
    toast.error('请输入有效的邮箱地址')
    return
  }
  toast.success('订阅成功！感谢您的关注')
  email.value = ''
}

const { data: productsData, pending } = await useAsyncData(
  'home-products',
  () => getProducts(1, 100), // Get all products for home page filtering
  { default: () => ({ items: [], total: 0 }) }
)

const products = computed(() => productsData.value?.items || [])

const primaryTint = computed(() => {
  if (!process.client) return 'rgba(59,130,246,0.22)'
  const v = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()
  if (!v) return 'rgba(59,130,246,0.22)'
  return `${v}22`
})

const categoryMeta: Record<string, { label: string; description: string; icon: any }> = {
  "men's clothing": { label: '男装', description: '日常穿搭、外套与基础款', icon: ShoppingBagIcon },
  'jewelery': { label: '珠宝配饰', description: '戒指、耳饰、手链等', icon: SparklesIcon }
}

const categoryCards = computed(() => {
  const counts = products.value.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  return Object.keys(counts).map((key) => {
    const meta = categoryMeta[key] || { label: key, description: '精选商品分类', icon: TagIcon }
    return { key, ...meta, count: counts[key] }
  }).sort((a, b) => b.count - a.count)
})

const recommended = computed(() => {
  return [...products.value]
    .sort((a, b) => (b.rating.rate * Math.log10(b.rating.count + 10)) - (a.rating.rate * Math.log10(a.rating.count + 10)))
    .slice(0, 8)
})

const goToProducts = (query?: Record<string, string | undefined>) => {
  const q = (query?.q ?? '').trim()
  const normalized: Record<string, string> = {}
  if (query?.category) normalized.category = query.category
  if (q) normalized.q = q
  router.push({ path: '/products', query: normalized })
}

const addToCartAndToast = (p: Product) => {
  addToCart(p)
  toast.success(`已加入购物车：${p.title}`)
}
</script>
