<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'

const isOpen = ref(false)
const themeStore = useThemeStore()
const { user } = useAuth()

// 预设颜色
const colors = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // amber
  '#8b5cf6', // violet
  '#ec4899'  // pink
]

const radii = [
  { label: '直角', value: '0px' },
  { label: '小圆角', value: '0.25rem' },
  { label: '中圆角', value: '0.5rem' },
  { label: '大圆角', value: '1rem' }
]

const toggle = () => {
  isOpen.value = !isOpen.value
}

const updateColor = (color: string) => {
  themeStore.updateTheme({ primaryColor: color }, user.value?.id?.toString())
}

const updateRadius = (radius: string) => {
  themeStore.updateTheme({ borderRadius: radius }, user.value?.id?.toString())
}

const reset = () => {
  themeStore.resetTheme()
}
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <button 
      @click="toggle"
      class="fixed bottom-6 right-6 p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-all z-50 group"
      title="主题设置"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>

    <!-- Settings Panel -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex justify-end"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="toggle"></div>

      <!-- Drawer -->
      <div class="relative w-80 bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slide-in">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-bold text-gray-900">主题设置</h2>
          <button @click="toggle" class="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Theme Color -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-700 mb-4">主题色</h3>
          <div class="grid grid-cols-6 gap-2">
            <button
              v-for="color in colors"
              :key="color"
              @click="updateColor(color)"
              class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none"
              :class="themeStore.theme.primaryColor === color ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' : 'border-transparent'"
              :style="{ backgroundColor: color }"
            />
          </div>
        </div>

        <!-- Border Radius -->
        <div class="mb-8">
          <h3 class="text-sm font-medium text-gray-700 mb-4">圆角风格</h3>
          <div class="space-y-2">
            <button
              v-for="radius in radii"
              :key="radius.value"
              @click="updateRadius(radius.value)"
              class="w-full px-4 py-2 text-left text-sm rounded-md border transition-colors"
              :class="themeStore.theme.borderRadius === radius.value 
                ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/10 text-[var(--primary-color)] font-medium' 
                : 'border-gray-200 hover:border-gray-300 text-gray-600'"
              :style="{ borderRadius: radius.value }"
            >
              {{ radius.label }}
            </button>
          </div>
        </div>
        
        <!-- Reset Button -->
        <div class="pt-6 border-t border-gray-100">
          <button 
            @click="reset"
            class="w-full px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            恢复默认设置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
