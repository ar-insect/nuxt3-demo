<template>
  <div class="http-demo">
    <h1>HTTP 工具类演示</h1>
    
    <section>
      <h2>基础请求</h2>
      <div class="demo-actions">
        <button @click="handleGet">GET 请求</button>
        <button @click="handlePost">POST 请求</button>
      </div>
      <div class="result" v-if="result">
        <h3>请求结果:</h3>
        <pre>{{ result }}</pre>
      </div>
    </section>

    <section>
      <h2>文件上传</h2>
      <div class="demo-actions">
        <input type="file" @change="handleFileChange" />
        <button @click="handleUpload" :disabled="!selectedFile">上传文件</button>
      </div>
    </section>

    <section>
      <h2>文件下载 (模拟)</h2>
      <div class="demo-actions">
        <!-- 注意：这里演示下载逻辑，实际需要后端支持 Blob 返回 -->
        <button @click="handleDownload">下载示例文件</button>
      </div>
    </section>

    <div style="margin-top: 20px;">
      <NuxtLink to="/">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const result = ref<any>(null)
const selectedFile = ref<File | null>(null)

// 演示 GET
const handleGet = async () => {
  try {
    const res = await http.get('/test')
    result.value = res
  } catch (error) {
    console.error(error)
    result.value = error
  }
}

// 演示 POST
const handlePost = async () => {
  try {
    const res = await http.post('/test', { name: 'Nuxt3', version: '3.0.0' })
    result.value = res
  } catch (error) {
    console.error(error)
    result.value = error
  }
}

// 文件选择
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0]
  }
}

// 演示上传
const handleUpload = async () => {
  if (!selectedFile.value) return
  
  try {
    const res = await http.upload('/upload', selectedFile.value)
    result.value = res
    alert('上传成功！')
  } catch (error) {
    console.error(error)
    alert('上传失败')
  }
}

// 演示下载 (这里暂时请求一个文本作为 Blob 下载演示)
const handleDownload = async () => {
  try {
    // 假设 /api/test 返回的是文件流，这里只是演示 download 方法的调用
    // 实际场景请替换为真实的下载接口
    await http.download('/test', 'test-data.json')
  } catch (error) {
    console.error('下载失败', error)
  }
}
</script>

<style scoped>
.http-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
section {
  margin-bottom: 2rem;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
}
.demo-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.result {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow: auto;
}
</style>
