<template>
  <div class="plugins-demo">
    <h1>全局插件演示</h1>
    
    <div class="card">
      <h2>1. 模板中使用插件</h2>
      <p>直接在模板中使用 <code>$myHelper</code>:</p>
      <div class="result">
        {{ $myHelper('Hello from Template') }}
      </div>
    </div>

    <div class="card">
      <h2>2. Script 中使用插件</h2>
      <p>通过 <code>useNuxtApp()</code> 获取:</p>
      <div class="result">
        {{ scriptResult }}
      </div>
      <button @click="triggerPlugin">重新调用插件</button>
    </div>

    <div class="card">
      <h2>3. 插件说明</h2>
      <ul>
        <li>插件文件位于: <code>plugins/test-plugin.ts</code></li>
        <li>Nuxt 自动扫描 plugins 目录，无需手动配置。</li>
        <li>使用 <code>provide</code> 返回的对象会自动注入到 Nuxt 实例中。</li>
        <li>注入的属性会自动带上 <code>$</code> 前缀。</li>
      </ul>
    </div>

    <div style="margin-top: 20px;">
      <NuxtLink to="/">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $myHelper } = useNuxtApp()
const scriptResult = ref('')

// 初始化调用
scriptResult.value = $myHelper('Hello from Script Setup')

const triggerPlugin = () => {
  scriptResult.value = $myHelper('Button Clicked')
}
</script>

<style scoped>
.plugins-demo {
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

.result {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
  color: #00dc82;
  font-weight: bold;
  margin: 1rem 0;
}

button {
  padding: 0.5rem 1rem;
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

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
</style>
