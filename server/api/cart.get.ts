import { getSessionId } from '../utils/session'

export default defineEventHandler(async (event) => {
  const sessionId = getSessionId(event)
  const redis = useRedis()
  
  if (!redis) {
    // Fallback to empty array if Redis is not available
    return []
  }

  const cartKey = `cart:${sessionId}`
  const cartData = await redis.get(cartKey)

  return cartData ? JSON.parse(cartData) : []
})
