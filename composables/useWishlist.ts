import type { Product } from './useProducts'

export const useWishlist = () => {
  const wishlistItems = useState<Product[]>('wishlist', () => [])

  // Sync with server
  const { data } = useFetch<Product[]>('/api/wishlist', {
    key: 'wishlist-data',
    lazy: true
  })

  // Watch for data changes from server
  watch(data, (newWishlist) => {
    if (newWishlist && wishlistItems.value.length === 0) {
      wishlistItems.value = newWishlist
    }
  }, { immediate: true })

  const saveWishlist = async () => {
    try {
      await $fetch('/api/wishlist', {
        method: 'POST',
        body: wishlistItems.value
      })
    } catch (e) {
      console.error('Failed to save wishlist', e)
    }
  }

  const addToWishlist = async (product: Product) => {
    if (!isInWishlist(product.id)) {
      wishlistItems.value.push(product)
      await saveWishlist()
    }
  }

  const removeFromWishlist = async (productId: number) => {
    const index = wishlistItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
      await saveWishlist()
    }
  }

  const toggleWishlist = async (product: Product) => {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id)
    } else {
      await addToWishlist(product)
    }
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.value.some(item => item.id === productId)
  }

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist
  }
}
