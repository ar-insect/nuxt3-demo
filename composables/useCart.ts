import type { Product } from './useProducts'

export interface CartItem extends Product {
  quantity: number
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart', () => [])

  const addToCart = (product: Product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productId: number) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  const clearCart = () => {
    cartItems.value = []
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
