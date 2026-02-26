import { type User } from '~/composables/useAuth'

export default defineNuxtPlugin(async () => {
  const user = useState<User | null>('auth-user')
  const token = useCookie('auth-token')

  if (token.value && !user.value) {
    try {
      const { data, error } = await useFetch('/api/auth/me')
      if (data.value) {
        user.value = data.value.user as User
      } else if (error.value) {
        // Token invalid
        token.value = null
      }
    } catch (e) {
      token.value = null
    }
  }
})
