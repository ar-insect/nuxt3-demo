import type { Product } from './useProducts'

export const useWishlist = () => {
  const wishlistItems = useState<Product[]>('wishlist', () => [])

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      wishlistItems.value.push(product)
    }
  }

  const removeFromWishlist = (productId: number) => {
    const index = wishlistItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    }
  }

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
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
