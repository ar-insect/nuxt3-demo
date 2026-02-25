export default defineEventHandler((event) => {
  return {
    code: 200,
    message: 'Success',
    data: {
      name: 'Test User',
      age: 18
    }
  }
})
