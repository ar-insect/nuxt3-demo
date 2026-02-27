import Redis from 'ioredis'

let redisClient: Redis | null = null

export const useRedis = () => {
  if (redisClient) {
    return redisClient
  }

  const config = useRuntimeConfig()
  
  // 防止在构建过程中连接 Redis
  if (process.env.NODE_ENV === 'production' && process.env.npm_lifecycle_event === 'build') {
    return null
  }

  const redisConfig = {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password || undefined,
    db: config.redis.db,
    retryStrategy: (times: number) => {
      // 最多重试 3 次，每次间隔 200ms
      if (times > 3) {
        return null
      }
      return 200
    }
  }

  try {
    redisClient = new Redis(redisConfig)
    
    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err)
    })
    
    redisClient.on('connect', () => {
      console.log('Redis connected successfully')
    })
  } catch (error) {
    console.error('Failed to initialize Redis client:', error)
  }

  return redisClient
}
