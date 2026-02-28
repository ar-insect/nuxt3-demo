import { describe, it, expect } from 'vitest'
import { useProducts } from '../../composables/useProducts'

describe('useProducts', () => {
  const { getProducts } = useProducts()

  it('should return all products when no filter is applied', async () => {
    const { items, total } = await getProducts(1, 100)
    expect(total).toBeGreaterThan(0)
    expect(items.length).toBe(total)
  })

  it('should filter products by category', async () => {
    const category = "men's clothing"
    const { items } = await getProducts(1, 100, category)
    items.forEach(item => {
      expect(item.category).toBe(category)
    })
  })

  it('should filter products by search query', async () => {
    const query = 'jacket'
    const { items } = await getProducts(1, 100, undefined, query)
    items.forEach(item => {
      const titleMatch = item.title.toLowerCase().includes(query.toLowerCase())
      const descMatch = item.description.toLowerCase().includes(query.toLowerCase())
      expect(titleMatch || descMatch).toBe(true)
    })
  })

  it('should paginate results', async () => {
    const limit = 2
    const { items: page1 } = await getProducts(1, limit)
    const { items: page2 } = await getProducts(2, limit)

    expect(page1.length).toBe(limit)
    expect(page2.length).toBe(limit)
    expect(page1[0].id).not.toBe(page2[0].id)
  })

  it('should combine search and pagination', async () => {
    const query = 'e' // Should match many
    const limit = 2
    const { items, total } = await getProducts(1, limit, undefined, query)
    
    expect(items.length).toBeLessThanOrEqual(limit)
    expect(total).toBeGreaterThan(0)
  })
})
