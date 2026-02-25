export const useUser = () => {
  return useState('user', () => ({
    name: 'Nuxt Developer',
    role: 'Admin'
  }))
}
