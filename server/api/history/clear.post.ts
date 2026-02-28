import { getSessionId } from '../../utils/session'
import { useRedis } from '../../utils/redis'

export default defineEventHandler(async (event) => {
  const sessionId = getSessionId(event)
  const redis = useRedis()

  if (!redis) {
    return { success: false, message: 'Redis not available' }
  }

  const historyKey = `history:${sessionId}`
  await redis.del(historyKey)

  return { success: true }
})
