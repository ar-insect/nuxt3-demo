<template>
  <div class="ssr-demo">
    <h1>服务端渲染 (SSR) 调试演示</h1>
    
    <div class="card">
      <h2>1. 数据展示区域</h2>
      <p>下面的数据是在服务端获取并渲染的（查看源代码可见内容）。</p>
      
      <div v-if="pending" class="loading">
        加载中...
      </div>
      
      <div v-else-if="error" class="error">
        加载失败: {{ error.message }}
      </div>
      
      <div v-else class="data-display">
        <ul>
          <li><strong>ID:</strong> {{ data?.id }}</li>
          <li><strong>消息:</strong> {{ data?.message }}</li>
          <li><strong>服务端时间:</strong> {{ data?.serverTime }}</li>
          <li><strong>处理结果:</strong> {{ data?.data }}</li>
          <li><strong>User Agent:</strong> <span class="ua">{{ data?.headers }}</span></li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h2>2. 调试说明</h2>
      <ol>
        <li>确保已选择 <strong>"fullstack: nuxt"</strong> 或 <strong>"server: nuxt"</strong> 调试配置启动。</li>
        <li>打开 <code>server/api/ssr-test.get.ts</code> 文件，在第 5 行 <code>const query = ...</code> 处设置断点。</li>
        <li>刷新此页面 (Cmd+R)。</li>
        <li>观察 VS Code 应该会捕获到断点，您可以查看 <code>event</code> 对象和变量。</li>
      </ol>
    </div>

    <div class="card">
      <h2>3. 客户端交互</h2>
      <p>点击下方按钮将在客户端重新发起请求（也会触发服务端 API，但通过 fetch 调用）。</p>
      <button @click="refreshData">刷新数据</button>
      <button @click="updateId">更新 ID 并刷新</button>
    </div>

    <div style="margin-top: 20px;">
      <NuxtLink to="/">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentId = ref('demo-1')

// useFetch 在服务端渲染期间会直接调用 API 函数（模拟请求），
// 在客户端导航时会发起真实的 HTTP 请求。
// 在这里设置断点，可以观察 setup 函数在服务端和客户端的执行情况。
console.log('[SSR Demo] Page setup executing...')

const { data, pending, error, refresh } = await useFetch<any>('/api/ssr-test', {
  query: { id: currentId }
})

const refreshData = () => {
  refresh()
}

const updateId = () => {
  currentId.value = `demo-${Math.floor(Math.random() * 1000)}`
  // query 参数是响应式的，useFetch 会自动重新请求
}
</script>

<style scoped>
.ssr-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.data-display {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
  font-family: monospace;
}

.ua {
  word-break: break-all;
  font-size: 0.9em;
  color: #666;
}

button {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  cursor: pointer;
  background-color: #00dc82;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
}

button:hover {
  background-color: #00c474;
}

.loading {
  color: #666;
  font-style: italic;
}

.error {
  color: #ff4d4f;
}
</style>
