import { getSessionId } from '../utils/session'

export default defineEventHandler(async (event) => {
  const sessionId = getSessionId(event)
  const body = await readBody(event)
  const redis = useRedis()

  if (!redis) {
    return { success: false, message: 'Redis not available' }
  }

  const cartKey = `cart:${sessionId}`
  await redis.set(cartKey, JSON.stringify(body))

  return { success: true }
})
