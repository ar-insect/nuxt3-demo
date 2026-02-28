import { getSessionId } from '../../utils/session'
import { useRedis } from '../../utils/redis'

export default defineEventHandler(async (event) => {
  const sessionId = getSessionId(event)
  const body = await readBody(event)
  const redis = useRedis()

  if (!redis) {
    return { success: false, message: 'Redis not available' }
  }

  if (!body || !body.id) {
    return { success: false, message: 'Invalid product data' }
  }

  const historyKey = `history:${sessionId}`
  
  // Get current history
  const currentData = await redis.get(historyKey)
  let history = currentData ? JSON.parse(currentData) : []

  // Remove existing item with same ID (to move it to top)
  history = history.filter((item: any) => item.id !== body.id)

  // Add new item to the beginning
  history.unshift(body)

  // Limit to 20 items
  if (history.length > 20) {
    history = history.slice(0, 20)
  }

  // Save back to Redis
  await redis.set(historyKey, JSON.stringify(history))

  return { success: true, history }
})
