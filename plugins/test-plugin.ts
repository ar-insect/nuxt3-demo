export default defineNuxtPlugin((nuxtApp) => {
  // 插件逻辑在应用初始化时执行
  const config = useRuntimeConfig()
  
  console.log('[插件] 测试插件已初始化！')

  // 我们可以通过 provide 注入全局辅助函数或属性
  // 在组件中可以通过 useNuxtApp().$myHelper 访问
  // 在模板中可以直接通过 $myHelper 访问
  return {
    provide: {
      myHelper: (msg: string) => {
        return `[插件助手] ${msg} - 处理于 ${new Date().toLocaleTimeString()}`
      }
    }
  }
})

