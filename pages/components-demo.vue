<template>
  <div class="max-w-5xl mx-auto space-y-12">
    <div class="border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">Global Components</h1>
      <p class="mt-2 text-lg text-gray-500">
        Showcase of reusable UI components available throughout the application.
      </p>
    </div>
    
    <!-- Modal Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">Modal Dialog (BaseModal)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Interactive</span>
      </div>
      <div class="p-6">
        <p class="text-gray-600 mb-6">
          A fully accessible modal component with customizable title, content, and actions.
          Supports backdrop click to close and escape key navigation.
        </p>
        <div class="flex items-center gap-4">
          <button 
            @click="showModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Open Modal
          </button>
        </div>
        
        <BaseModal
          v-model="showModal"
          title="Demo Modal"
          @confirm="handleModalConfirm"
          @cancel="handleModalCancel"
        >
          <div class="space-y-4">
            <p class="text-gray-600">
              This is the content of the global modal component. It can contain any arbitrary HTML or other components.
            </p>
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p class="text-sm text-blue-800">
                <strong>Tip:</strong> You can pass custom slots for header and footer if needed.
              </p>
            </div>
          </div>
        </BaseModal>
      </div>
    </section>

    <!-- Loading Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">Loading State (BaseLoading)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Utility</span>
      </div>
      <div class="p-6">
        <p class="text-gray-600 mb-6">
          A flexible loading overlay that can cover a specific container or the entire screen.
        </p>
        
        <div class="relative h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center mb-6 overflow-hidden">
          <div class="text-center p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-2">Content Container</h3>
            <p class="text-gray-500 max-w-sm mx-auto">
              This area represents a data-fetching component. Click the button below to simulate a loading state.
            </p>
          </div>
          
          <!-- Loading Component -->
          <BaseLoading :loading="loading" text="Fetching data..." />
        </div>

        <button 
          @click="toggleLoading"
          :disabled="loading"
          class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {{ loading ? 'Loading...' : 'Toggle Loading State' }}
        </button>
      </div>
    </section>

    <!-- Toast Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">Toast Notifications (BaseToast)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">Feedback</span>
      </div>
      <div class="p-6">
        <p class="text-gray-600 mb-6">
          Non-blocking notifications for providing feedback to users. 
          Uses the <code>useToast</code> composable for easy triggering from anywhere.
        </p>
        
        <div class="flex flex-wrap gap-4">
          <button 
            class="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            @click="toast.success('Operation completed successfully!')"
          >
            Success Toast
          </button>
          
          <button 
            class="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            @click="toast.error('An error occurred while processing.')"
          >
            Error Toast
          </button>
          
          <button 
            class="px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
            @click="toast.warning('Please review your inputs.')"
          >
            Warning Toast
          </button>
          
          <button 
            class="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            @click="toast.info('New updates are available.')"
          >
            Info Toast
          </button>
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
        Back to Home
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
  toast.success('Confirmed successfully')
}

const handleModalCancel = () => {
  showModal.value = false
  toast.info('Cancelled action')
}

// Loading
const loading = ref(false)
const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    toast.success('Loading completed')
  }, 2000)
}
</script>
