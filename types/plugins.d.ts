// 插件类型扩展定义
// 用于扩展 NuxtApp 和 Vue 实例的类型

export {} // 确保这是个模块

declare module '#app' {
  interface NuxtApp {
    $myHelper(msg: string): string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $myHelper(msg: string): string
  }
}
