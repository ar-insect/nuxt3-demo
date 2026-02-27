<template>
  <div class="pinia-demo">
    <h1>状态管理 (Pinia) 演示</h1>
    
    <div class="grid-container">
      <!-- 计数器示例 -->
      <section class="card">
        <h2>基础示例: 计数器</h2>
        <div class="counter-display">
          <div class="count-value">{{ counter.count }}</div>
          <div class="count-double">双倍值: {{ counter.doubleCount }}</div>
        </div>
        
        <div class="controls">
          <button @click="counter.increment()" class="btn btn-primary">+</button>
          <button @click="counter.decrement()" class="btn btn-secondary">-</button>
          <button @click="counter.reset()" class="btn btn-danger">重置</button>
          <button @click="counter.simulateAsyncAction()" class="btn btn-info" :disabled="loading">
            {{ loading ? '加载中...' : '异步加10' }}
          </button>
        </div>
        
        <div class="store-state">
          <h3>Store 状态:</h3>
          <pre>{{ counter.$state }}</pre>
        </div>
      </section>

      <!-- 用户状态示例 -->
      <section class="card">
        <h2>进阶示例: 用户状态</h2>
        
        <div v-if="userStore.isLoggedIn" class="user-profile">
          <div class="avatar">
            <img :src="userStore.currentUser?.avatar" alt="Avatar" />
          </div>
          <div class="info">
            <h3>欢迎, {{ userStore.userName }}</h3>
            <p>邮箱: {{ userStore.currentUser?.email }}</p>
            <p>ID: {{ userStore.currentUser?.id }}</p>
            <p>Token: {{ userStore.token }}</p>
            <span v-if="userStore.isAdmin" class="badge badge-admin">管理员</span>
            <span v-else class="badge badge-user">普通用户</span>
          </div>
          
          <div class="user-actions">
            <button @click="handleUpdateProfile" class="btn btn-sm">修改名称</button>
            <button @click="userStore.logout()" class="btn btn-danger btn-sm">退出登录</button>
          </div>
        </div>
        
        <div v-else class="login-form">
          <p>当前未登录</p>
          <div class="form-group">
            <input 
              v-model="loginEmail" 
              type="email" 
              placeholder="输入邮箱 (试试 admin@test.com)" 
              @keyup.enter="handleLogin"
            />
          </div>
          <button @click="handleLogin" class="btn btn-success" :disabled="loginLoading">
            {{ loginLoading ? '登录中...' : '模拟登录' }}
          </button>
        </div>
      </section>
    </div>
    
    <div class="navigation">
      <NuxtLink to="/" class="back-link">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// 自动导入 stores (Nuxt 3 特性)
// 如果没有自动导入，可以手动 import { useCounterStore } from '~/stores/counter'
import { useCounterStore } from '~/stores/counter'
import { useUserStore } from '~/stores/user'

const counter = useCounterStore()
const userStore = useUserStore()

const loading = ref(false)
const loginLoading = ref(false)
const loginEmail = ref('')

// 监听异步操作
counter.$onAction(({ name, after, onError }) => {
  if (name === 'simulateAsyncAction') {
    loading.value = true
    after(() => {
      loading.value = false
    })
    onError(() => {
      loading.value = false
    })
  }
})

const handleLogin = async () => {
  if (!loginEmail.value) return
  
  loginLoading.value = true
  try {
    await userStore.login(loginEmail.value)
    loginEmail.value = ''
  } finally {
    loginLoading.value = false
  }
}

const handleUpdateProfile = () => {
  const newName = prompt('请输入新名称:', userStore.currentUser?.name)
  if (newName) {
    userStore.updateProfile({ name: newName })
  }
}
</script>

<style scoped>
.pinia-demo {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
}

h2 {
  margin-top: 0;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  color: #333;
}

/* Counter Styles */
.counter-display {
  text-align: center;
  margin-bottom: 1.5rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.count-value {
  font-size: 3rem;
  font-weight: bold;
  color: #3b82f6;
}

.count-double {
  color: #6b7280;
  font-size: 0.9rem;
}

.controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.store-state {
  background: #282c34;
  color: #abb2bf;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  overflow: auto;
}

/* User Styles */
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
}

.info h3 {
  margin: 0 0 0.5rem 0;
}

.info p {
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.badge-admin {
  background-color: #fee2e2;
  color: #ef4444;
}

.badge-user {
  background-color: #dbeafe;
  color: #3b82f6;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

/* Buttons */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary { background: #3b82f6; color: white; }
.btn-primary:hover { background: #2563eb; }

.btn-secondary { background: #6b7280; color: white; }
.btn-secondary:hover { background: #4b5563; }

.btn-danger { background: #ef4444; color: white; }
.btn-danger:hover { background: #dc2626; }

.btn-success { background: #10b981; color: white; }
.btn-success:hover { background: #059669; }

.btn-info { background: #0ea5e9; color: white; }
.btn-info:hover { background: #0284c7; }

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.navigation {
  margin-top: 2rem;
  text-align: center;
}

.back-link {
  color: #666;
  text-decoration: none;
}
.back-link:hover {
  color: #333;
  text-decoration: underline;
}
</style>
