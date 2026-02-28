import type { Product } from './useProducts'

export const useHistory = () => {
  const historyItems = useState<Product[]>('history', () => [])

  // Sync with server on mount (client-side only to avoid hydration mismatch if SSR data differs)
  // Actually, for history, it's user-specific, so SSR is fine if we use useAsyncData but it might be tricky with session cookies on first load.
  // Let's stick to client-side fetch for history to be safe and fast on navigation.
  const fetchHistory = async () => {
    try {
      const data = await $fetch<Product[]>('/api/history')
      historyItems.value = data || []
    } catch (e) {
      console.error('Failed to fetch history:', e)
    }
  }

  const addToHistory = async (product: Product) => {
    if (!product || !product.id) return

    // Optimistic update
    const index = historyItems.value.findIndex(item => item.id === product.id)
    if (index > -1) {
      historyItems.value.splice(index, 1)
    }
    historyItems.value.unshift(product)
    if (historyItems.value.length > 20) {
      historyItems.value = historyItems.value.slice(0, 20)
    }

    try {
      await $fetch('/api/history/add', {
        method: 'POST',
        body: product
      })
    } catch (e) {
      console.error('Failed to add to history:', e)
      // Revert on failure? Maybe not critical for history.
    }
  }

  const clearHistory = async () => {
    historyItems.value = []
    try {
      await $fetch('/api/history/clear', {
        method: 'POST'
      })
    } catch (e) {
      console.error('Failed to clear history:', e)
    }
  }

  return {
    historyItems,
    fetchHistory,
    addToHistory,
    clearHistory
  }
}
