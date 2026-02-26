export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated.value) {
    // Redirect to login page
    return navigateTo('/login')
  }
})
