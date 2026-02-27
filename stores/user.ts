import { defineStore } from 'pinia'

// 定义用户类型
interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export const useUserStore = defineStore('user-store', {
  state: () => ({
    currentUser: null as User | null,
    isLoggedIn: false,
    token: null as string | null
  }),
  
  getters: {
    // 获取当前用户名，如果没有登录则返回 'Guest'
    userName: (state) => state.currentUser?.name || 'Guest',
    
    // 检查是否拥有特定权限 (示例)
    isAdmin: (state) => state.currentUser?.email?.includes('admin') || false
  },
  
  actions: {
    // 模拟登录操作
    async login(email: string) {
      // 实际项目中这里会调用 API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      this.currentUser = {
        id: Math.floor(Math.random() * 1000),
        name: email.split('@')[0],
        email: email,
        avatar: 'https://placehold.co/100'
      }
      this.isLoggedIn = true
      this.token = 'mock-token-' + Date.now()
      
      return true
    },
    
    // 退出登录
    logout() {
      this.currentUser = null
      this.isLoggedIn = false
      this.token = null
    },
    
    // 更新用户信息
    updateProfile(updates: Partial<User>) {
      if (this.currentUser) {
        this.currentUser = { ...this.currentUser, ...updates }
      }
    }
  },
  
  // 开启持久化 (如果安装了 pinia-plugin-persistedstate)
  // persist: true
})
