export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.path.startsWith('/user')) return
  console.log('User module middleware:', to.path)
})
