import { getSessionId } from '../utils/session'

export default defineEventHandler(async (event) => {
  const sessionId = getSessionId(event)
  const redis = useRedis()
  
  if (!redis) {
    return []
  }

  const wishlistKey = `wishlist:${sessionId}`
  const wishlistData = await redis.get(wishlistKey)

  return wishlistData ? JSON.parse(wishlistData) : []
})
