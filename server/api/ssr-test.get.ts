export default defineEventHandler(async (event) => {
  // 模拟服务端处理延迟
  // 在此处打断点，可以调试服务端逻辑
  const query = getQuery(event)
  const id = query.id || 'default-id'

  console.log(`[SSR API] Processing request for ID: ${id}`)
  
  // 模拟一些业务逻辑
  const processedData = `Server processed ${id} at ${new Date().toISOString()}`
  
  return {
    id,
    message: 'Hello from Server Side!',
    timestamp: Date.now(),
    serverTime: new Date().toLocaleString(),
    data: processedData,
    headers: event.node.req.headers['user-agent'] // 显示请求来源
  }
})
