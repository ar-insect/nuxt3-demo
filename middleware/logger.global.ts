export default defineNuxtRouteMiddleware((to, from) => {
  // 仅在客户端打印，避免服务端日志混乱（根据需求调整）
  // 注意：process.client 和 process.server 可以用来区分环境
  
  const timestamp = new Date().toLocaleTimeString()
  
  if (import.meta.server) {
    console.log(`[Server Middleware ${timestamp}] Navigating to: ${to.path}`)
  }
  
  if (import.meta.client) {
    console.log(`%c[Global Middleware ${timestamp}]`, 'color: #00dc82; font-weight: bold;', `From: ${from.path} -> To: ${to.path}`)
  }

  // 示例：拦截特定路由（例如禁止访问 /forbidden）
  if (to.path === '/forbidden') {
    return abortNavigation('禁止访问该页面')
  }

  // 示例：重定向（如果需要）
  // if (to.path === '/old-path') {
  //   return navigateTo('/new-path')
  // }
})
