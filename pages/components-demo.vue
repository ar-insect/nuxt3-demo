<template>
  <div class="components-demo">
    <h1>全局组件演示</h1>
    
    <!-- 弹窗演示 -->
    <section>
      <h2>弹窗 (BaseModal)</h2>
      <button @click="showModal = true">打开弹窗</button>
      <BaseModal
        v-model="showModal"
        title="演示弹窗"
        @confirm="handleModalConfirm"
        @cancel="handleModalCancel"
      >
        <p>这是一个全局弹窗组件的内容。</p>
        <p>支持自定义标题、内容和按钮。</p>
      </BaseModal>
    </section>

    <!-- 加载演示 -->
    <section>
      <h2>加载 (BaseLoading)</h2>
      <div class="loading-container">
        <p>这是一个相对定位的容器，用于演示局部加载。</p>
        <BaseLoading :loading="loading" text="正在加载数据..." />
      </div>
      <button @click="toggleLoading">切换加载状态</button>
    </section>

    <!-- 消息提示演示 -->
    <section>
      <h2>消息提示 (BaseToast)</h2>
      <div class="toast-actions">
        <button class="btn-success" @click="toast.success('操作成功！')">成功提示</button>
        <button class="btn-error" @click="toast.error('发生错误！')">错误提示</button>
        <button class="btn-warning" @click="toast.warning('请注意！')">警告提示</button>
        <button class="btn-info" @click="toast.info('这是一条信息')">信息提示</button>
      </div>
    </section>

    <div style="margin-top: 20px;">
      <NuxtLink to="/">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

// Modal
const showModal = ref(false)
const handleModalConfirm = () => {
  toast.success('点击了确认')
}
const handleModalCancel = () => {
  toast.info('点击了取消')
}

// Loading
const loading = ref(false)
const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

// Toast
const toast = useToast()
</script>

<style scoped>
.components-demo {
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
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}
.loading-container {
  position: relative;
  height: 200px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 1px dashed #ccc;
}
.btn-success { background-color: #f6ffed; border: 1px solid #b7eb8f; color: #52c41a; }
.btn-error { background-color: #fff2f0; border: 1px solid #ffccc7; color: #ff4d4f; }
.btn-warning { background-color: #fffbe6; border: 1px solid #ffe58f; color: #faad14; }
.btn-info { background-color: #e6f7ff; border: 1px solid #91d5ff; color: #1890ff; }
</style>
