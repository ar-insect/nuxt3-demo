<template>
  <div class="max-w-5xl mx-auto space-y-12">
    <div class="border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">全局组件</h1>
      <p class="mt-2 text-lg text-gray-500">
        展示应用中可重用的 UI 组件。
      </p>
    </div>
    
    <!-- Modal Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">模态框 (BaseModal)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">交互式</span>
      </div>
      <div class="p-6">
        <p class="text-gray-600 mb-6">
          一个完全可访问的模态框组件，支持自定义标题、内容和操作。
          支持点击背景关闭和 ESC 键导航。
        </p>
        <div class="flex items-center gap-4">
          <button 
            @click="showModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            打开模态框
          </button>
        </div>
        
        <BaseModal
          v-model="showModal"
          title="演示模态框"
          @confirm="handleModalConfirm"
          @cancel="handleModalCancel"
        >
          <div class="space-y-4">
            <p class="text-gray-600">
              这是全局模态框组件的内容。它可以包含任何 HTML 或其他组件。
            </p>
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p class="text-sm text-blue-800">
                <strong>提示：</strong> 如果需要，您可以传递自定义的头部和底部插槽。
              </p>
            </div>
          </div>
        </BaseModal>
      </div>
    </section>

    <!-- Loading Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">加载状态 (BaseLoading)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">工具</span>
      </div>
      <div class="p-6">
        <p class="text-gray-600 mb-6">
          一个灵活的加载覆盖层，可以覆盖特定容器或整个屏幕。
        </p>
        
        <div class="relative h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center mb-6 overflow-hidden">
          <div class="text-center p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">内容容器</h3>
            <p class="text-gray-500 max-w-sm mx-auto">
              此区域代表数据获取组件。点击下方按钮模拟加载状态。
            </p>
          </div>
          
          <!-- Loading Component -->
          <BaseLoading :loading="loading" text="正在获取数据..." />
        </div>

        <button 
          @click="toggleLoading"
          :disabled="loading"
          class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {{ loading ? '加载中...' : '切换加载状态' }}
        </button>
      </div>
    </section>

    <!-- Toast Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">Toast 通知 (BaseToast)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">反馈</span>
      </div>
      <div class="p-6">
        <p class="text-gray-600 mb-6">
          用于向用户提供反馈的非阻塞通知。 
          使用 <code>useToast</code> 组合式函数，可从任何地方轻松触发。
        </p>
        
        <div class="flex flex-wrap gap-4">
          <BaseButton 
            variant="success"
            @click="toast.success('操作成功完成！')"
          >
            成功 Toast
          </BaseButton>
          
          <BaseButton 
            variant="danger"
            @click="toast.error('出错了！')"
          >
            错误 Toast
          </BaseButton>
          
          <BaseButton 
            variant="secondary"
            @click="toast.info('这是一些信息。')"
          >
            信息 Toast
          </BaseButton>
          
          <BaseButton 
            variant="outline"
            @click="toast.warning('警告：请谨慎操作。')"
          >
            警告 Toast
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- BaseButton Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">按钮 (BaseButton)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">交互式</span>
      </div>
      <div class="p-6 space-y-8">
        <!-- Variants -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">变体</h3>
          <div class="flex flex-wrap gap-4">
            <BaseButton>主要</BaseButton>
            <BaseButton variant="secondary">次要</BaseButton>
            <BaseButton variant="outline">轮廓</BaseButton>
            <BaseButton variant="danger">危险</BaseButton>
            <BaseButton variant="success">成功</BaseButton>
            <BaseButton variant="ghost">幽灵</BaseButton>
          </div>
        </div>

        <!-- Sizes -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">尺寸</h3>
          <div class="flex flex-wrap items-center gap-4">
            <BaseButton size="xs">XS 按钮</BaseButton>
            <BaseButton size="sm">小</BaseButton>
            <BaseButton size="md">中</BaseButton>
            <BaseButton size="lg">大</BaseButton>
            <BaseButton size="xl">特大</BaseButton>
          </div>
        </div>

        <!-- States -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">状态</h3>
          <div class="flex flex-wrap gap-4">
            <BaseButton :loading="true">加载中</BaseButton>
            <BaseButton disabled>禁用</BaseButton>
            <BaseButton disabled variant="secondary">禁用次要</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- BaseInput Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">表单输入 (BaseInput)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">表单</span>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput 
            label="用户名" 
            placeholder="输入您的用户名" 
            v-model="inputValues.username"
            hint="这将是您的公开显示名称。"
          />
          
          <BaseInput 
            label="邮箱" 
            type="email" 
            placeholder="you@example.com" 
            v-model="inputValues.email"
          />

          <BaseInput 
            label="密码" 
            type="password" 
            placeholder="请输入密码" 
            v-model="inputValues.password"
          />

          <BaseInput 
            label="错误状态" 
            placeholder="出错了..." 
            error="此字段为必填项"
            v-model="inputValues.error"
          />

          <BaseInput 
            label="带前缀" 
            placeholder="搜索..." 
            v-model="inputValues.search"
          >
            <template #prefix>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </template>
          </BaseInput>

          <BaseInput 
            label="禁用" 
            placeholder="无法编辑" 
            disabled
            v-model="inputValues.disabled"
          />
        </div>
      </div>
    </section>

    <!-- BaseCard Demo -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">卡片组件 (BaseCard)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">容器</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseCard title="简单卡片" subtitle="带副标题">
          <p class="text-gray-600">
            这是一个带有标题和副标题的简单卡片组件。它使用默认插槽作为内容。
          </p>
        </BaseCard>

        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg leading-6 font-medium text-gray-900">自定义头部</h3>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                活跃
              </span>
            </div>
          </template>
          <p class="text-gray-600">
            此卡片具有用于更复杂布局的自定义头部插槽。
          </p>
          <template #footer>
            <div class="flex justify-end">
              <BaseButton size="sm" variant="outline">查看详情</BaseButton>
            </div>
          </template>
        </BaseCard>
      </div>
    </section>

    <!-- Advanced Components Demo -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">高级组件</h2>
        <span class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">实验性</span>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">TSX 组件 (TsxButton)</h3>
        <p class="text-gray-600 mb-4">
          用 TSX (Vue 的 JSX) 编写的组件，演示了完整的 TypeScript 支持。
        </p>
        <div class="flex gap-4">
          <TsxButton>默认 TSX 按钮</TsxButton>
          <TsxButton variant="primary">主要 TSX 按钮</TsxButton>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">样式组件 (StyledButton)</h3>
        <p class="text-gray-600 mb-4">
          使用 <code>vue3-styled-components</code> 构建的组件，用于 CSS-in-JS 样式。
        </p>
        <div class="flex gap-4 items-center">
          <StyledButton>默认样式</StyledButton>
          <StyledButton :primary="true">主要样式</StyledButton>
        </div>
      </div>
    </section>

    <div class="flex justify-center pt-8">
      <NuxtLink 
        to="/" 
        class="text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

// Modal
const showModal = ref(false)
const toast = useToast()

const handleModalConfirm = () => {
  showModal.value = false
  toast.success('确认成功')
}

const handleModalCancel = () => {
  showModal.value = false
  toast.info('操作已取消')
}

// Loading
const loading = ref(false)
const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    toast.success('加载完成')
  }, 2000)
}

const inputValues = reactive({
  username: '',
  email: '',
  password: '',
  error: '',
  search: '',
  disabled: ''
})
</script>
