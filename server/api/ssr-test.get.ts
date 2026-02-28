export default defineEventHandler(async (event) => {
  // 模拟服务端处理延迟
  // 在此处打断点，可以调试服务端逻辑
  const query = getQuery(event)
  const id = query.id || 'default-id'

  console.log(`[SSR API] 正在处理 ID 请求: ${id}`)
  
  // 模拟一些业务逻辑
  const processedData = `服务端已处理 ${id} 于 ${new Date().toISOString()}`
  
  return {
    id,
    message: '来自服务端的问候！',
    timestamp: Date.now(),
    serverTime: new Date().toLocaleString(),
    data: processedData,
    headers: event.node.req.headers['user-agent'] // 显示请求来源
  }
})
