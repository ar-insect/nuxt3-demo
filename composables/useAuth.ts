export interface User {
  id: number
  username: string
  name: string
  role: string
  avatar: string
}

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const token = useCookie('auth-token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'lax'
  })
  const toast = useToast()
  const router = useRouter()

  const login = async (username: string, password: string) => {
    try {
      const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      })

      if (error.value) {
        toast.error(error.value.statusMessage || 'Login failed')
        return false
      }

      if (data.value) {
        token.value = data.value.token
        user.value = data.value.user
        toast.success('Login successful')
        router.push('/')
        return true
      }
      return false
    } catch (e: any) {
      toast.error(e.message || 'An error occurred')
      return false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    toast.info('Logged out')
    router.push('/login')
  }

  return {
    user,
    token,
    isAuthenticated: computed(() => !!user.value),
    login,
    logout
  }
}
