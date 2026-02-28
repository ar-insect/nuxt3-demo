import { useRedis } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth-token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // In a real app, verify token and fetch user from DB
  if (token.startsWith('mock-jwt-token-')) {
    const baseUser = {
      id: 1,
      username: 'admin',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
    }

    // Try to get updated profile from Redis
    const redis = useRedis()
    if (redis) {
      try {
        const key = `user:profile:${baseUser.id}`
        const profileData = await redis.get(key)
        if (profileData) {
          const profile = JSON.parse(profileData)
          if (profile.name) baseUser.name = profile.name
          if (profile.avatar) baseUser.avatar = profile.avatar
        }
      } catch (e) {
        console.error('Error fetching user profile from Redis:', e)
      }
    }

    return {
      user: baseUser
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid token'
  })
})
