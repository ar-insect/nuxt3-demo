export default defineNuxtPlugin((nuxtApp) => {
  // 辅助函数：发送日志到后端
  const sendErrorToService = (log: any) => {
    if (process.client) {
      // 使用 useFetch 或 $fetch 发送日志
      // 使用 catch 忽略发送失败的情况，避免无限循环
      $fetch('/api/log', {
        method: 'POST',
        body: log
      }).catch((err) => {
        console.error('Failed to send error log to server:', err)
      })
    }
  }

  // 1. 捕获 Vue 组件错误
  // 这包括组件生命周期钩子、渲染函数、事件处理器等中的错误
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // 构造结构化日志对象
    const errorLog = {
      type: 'Vue Error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace',
      component: instance ? instance.$.type.name || instance.$.type.__name || 'Anonymous Component' : 'Unknown',
      info: info, // 错误发生的具体位置（如：'render function', 'watcher callback'）
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'SSR Context'
    }

    // 在开发环境打印详细日志
    console.error('Captured Vue Error:', errorLog)

    // 发送日志到后端
    sendErrorToService(errorLog)
  }

  // 2. 捕获 Nuxt 应用级错误
  // 这包括插件初始化、中间件、路由导航守卫中的错误
  nuxtApp.hook('app:error', (error) => {
    const errorLog = {
      type: 'Nuxt App Error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : 'No stack trace',
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'SSR Context'
    }

    console.error('Captured Nuxt App Error:', errorLog)
    
    sendErrorToService(errorLog)
  })

  // 3. 全局未捕获的 Promise 异常 (仅限客户端)
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      const errorLog = {
        type: 'Unhandled Rejection',
        message: event.reason instanceof Error ? event.reason.message : String(event.reason),
        stack: event.reason instanceof Error ? event.reason.stack : 'No stack trace',
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
      
      console.error('Captured Unhandled Rejection:', errorLog)
      
      sendErrorToService(errorLog)
    })

    // 4. 全局脚本错误 (仅限客户端)
    window.addEventListener('error', (event) => {
      const errorLog = {
        type: 'Global Script Error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString(),
        url: window.location.href
      }
      
      console.error('Captured Global Script Error:', errorLog)
      
      sendErrorToService(errorLog)
    })
  }

  return {
    provide: {
      // 提供一个手动记录错误的工具函数
      logError: (error: unknown, context: string = 'Manual Log') => {
        const errorLog = {
          type: 'Manual Error Log',
          context,
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : 'No stack trace',
          timestamp: new Date().toISOString(),
          url: typeof window !== 'undefined' ? window.location.href : 'SSR Context'
        }
        console.error('Manual Error Log:', errorLog)
        sendErrorToService(errorLog)
      }
    }
  }
})
