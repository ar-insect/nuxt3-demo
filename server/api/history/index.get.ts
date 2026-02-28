import { getSessionId } from '../../utils/session'
import { useRedis } from '../../utils/redis'

export default defineEventHandler(async (event) => {
  const sessionId = getSessionId(event)
  const redis = useRedis()

  if (!redis) {
    return []
  }

  const historyKey = `history:${sessionId}`
  const data = await redis.get(historyKey)

  return data ? JSON.parse(data) : []
})
