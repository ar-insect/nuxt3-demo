export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (username === 'admin' && password === '123456') {
    // Mock token generation
    const token = 'mock-jwt-token-' + Date.now()
    
    return {
      token,
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
    statusMessage: 'Invalid credentials. Try admin/123456'
  })
})
