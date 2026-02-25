export default defineNuxtRouteMiddleware((to, from) => {
  console.log('User module middleware running on:', to.path)
  // 可以在这里添加权限校验逻辑
})
