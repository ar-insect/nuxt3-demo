import { useRedis } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing log data'
    })
  }

  try {
    const redis = useRedis()
    
    if (!redis) {
      console.warn('Redis client not available, skipping log save')
      return { success: false, message: 'Redis not available' }
    }

    const logEntry = {
      ...body,
      serverTimestamp: new Date().toISOString(),
      ip: getRequestIP(event) || 'unknown'
    }

    // 将日志存入 Redis List
    // 使用 JSON 序列化
    await redis.lpush('app:logs', JSON.stringify(logEntry))
    
    // 只保留最近 1000 条日志
    await redis.ltrim('app:logs', 0, 999)

    return { success: true }
  } catch (error) {
    console.error('Failed to save log to Redis:', error)
    // 不抛出错误以免影响前端体验
    return { success: false, error: 'Internal Server Error' }
  }
})
