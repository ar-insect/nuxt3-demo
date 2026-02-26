export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth-token')

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // In a real app, verify token and fetch user from DB
  if (token.startsWith('mock-jwt-token-')) {
    return {
      user: {
        id: 1,
        username: 'admin',
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
      }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid token'
  })
})
