import type { Product } from './useProducts'

export interface CartItem extends Product {
  quantity: number
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart', () => [])

  // Sync with server
  const { data } = useFetch<CartItem[]>('/api/cart', {
    key: 'cart-data',
    server: false, // Client-side only to avoid double fetch with useState? No, we want SSR.
    // Actually, useFetch defaults to key based on url.
    // If we use useState, we want to hydrate it.
    lazy: true
  })

  // Watch for data changes from server
  watch(data, (newCart) => {
    if (newCart && cartItems.value.length === 0) {
      cartItems.value = newCart
    }
  }, { immediate: true })

  const saveCart = async () => {
    try {
      await $fetch('/api/cart', {
        method: 'POST',
        body: cartItems.value
      })
    } catch (e) {
      console.error('Failed to save cart', e)
    }
  }

  const addToCart = async (product: Product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
    await saveCart()
  }

  const removeFromCart = async (productId: number) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      await saveCart()
    }
  }

  const updateQuantity = async (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
      await saveCart()
    }
  }

  const clearCart = async () => {
    cartItems.value = []
    await saveCart()
  }

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  }
}
