import { defineEventHandler, getQuery } from 'h3'
import { useRedis } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.userId as string

  if (!userId) {
    return { error: 'User ID is required' }
  }

  const redis = useRedis()
  if (!redis) {
    console.error('Redis client not available')
    return null
  }

  try {
    const key = `user:theme:${userId}`
    const data = await redis.get(key)
    
    if (data) {
      return JSON.parse(data)
    }
    return null
  } catch (error) {
    console.error('Error fetching theme from Redis:', error)
    return { error: 'Failed to fetch theme' }
  }
})
