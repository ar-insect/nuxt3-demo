export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return {
    code: 200,
    message: 'Created',
    data: body
  }
})
