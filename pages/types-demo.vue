<template>
  <div class="types-demo">
    <h1>全局类型定义演示</h1>
    
    <div class="card">
      <h2>1. 全局接口 ApiResponse</h2>
      <p>响应数据结构:</p>
      <pre>{{ responseData }}</pre>
    </div>

    <div class="card">
      <h2>2. 全局接口 IUser</h2>
      <p>用户信息:</p>
      <ul>
        <li>ID: {{ userData.id }}</li>
        <li>Username: {{ userData.username }}</li>
        <li>Role: {{ userData.role }}</li>
      </ul>
    </div>

    <div class="card">
      <h2>3. 说明</h2>
      <ul>
        <li>类型文件位于: <code>types/global.d.ts</code></li>
        <li>使用 <code>declare interface</code> 定义的类型可以在全项目直接使用，无需 import。</li>
      </ul>
    </div>

    <div style="margin-top: 20px;">
      <NuxtLink to="/">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// 直接使用全局定义的类型，无需 import
const userData: IUser = {
  id: 1001,
  username: 'trae_user',
  role: 'admin',
  email: 'test@example.com'
}

const responseData: ApiResponse<IUser> = {
  code: 200,
  message: 'Success',
  data: userData,
  timestamp: Date.now()
}
</script>

<style scoped>
.types-demo {
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

pre {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
  color: #333;
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
</style>
