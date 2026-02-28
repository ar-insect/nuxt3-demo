import { useRedis } from '~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, avatar } = body

  // In a real app, get userId from session/token
  // Here we hardcode userId = 1 for the demo admin user
  const userId = 1

  const redis = useRedis()
  if (!redis) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Redis service unavailable'
    })
  }

  try {
    const key = `user:profile:${userId}`
    
    // Get existing profile to merge
    const existingData = await redis.get(key)
    const currentProfile = existingData ? JSON.parse(existingData) : {}

    const newProfile = {
      ...currentProfile,
      ...(name && { name }),
      ...(avatar && { avatar }),
      updatedAt: new Date().toISOString()
    }

    await redis.set(key, JSON.stringify(newProfile))

    return {
      code: 200,
      message: 'Profile updated successfully',
      data: newProfile
    }
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update profile'
    })
  }
})
