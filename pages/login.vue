<template>
  <div>
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        登录您的账户
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        或者使用 <span class="font-medium text-indigo-600 hover:text-indigo-500">admin / 123456</span>
      </p>
    </div>
    <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">用户名</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            v-model="username"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="用户名"
          />
        </div>
        <div>
          <label for="password" class="sr-only">密码</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            v-model="password"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="密码"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="loading"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- LockClosedIcon -->
            <svg
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const username = ref('')
const password = ref('')
const loading = ref(false)
const { login } = useAuth()

useSeoMeta({
  title: '用户登录',
  description: '登录您的 Nuxt3 演示账户。'
})

const handleLogin = async () => {
  if (!username.value || !password.value) return
  
  loading.value = true
  try {
    await login(username.value, password.value)
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'auth'
})
</script>
