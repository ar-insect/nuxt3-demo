import { defineEventHandler, readBody } from 'h3'
import { useRedis } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, config } = body

  if (!userId || !config) {
    return { error: 'Missing userId or config' }
  }

  const redis = useRedis()
  if (!redis) {
    console.error('Redis client not available')
    return { error: 'Redis service unavailable' }
  }

  try {
    const key = `user:theme:${userId}`
    await redis.set(key, JSON.stringify(config))
    return { success: true }
  } catch (error) {
    console.error('Error saving theme to Redis:', error)
    return { error: 'Failed to save theme' }
  }
})
