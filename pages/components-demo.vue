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
          <BaseButton 
            variant="success"
            @click="toast.success('Operation completed successfully!')"
          >
            Success Toast
          </BaseButton>
          
          <BaseButton 
            variant="danger"
            @click="toast.error('Something went wrong!')"
          >
            Error Toast
          </BaseButton>
          
          <BaseButton 
            variant="secondary"
            @click="toast.info('Here is some information.')"
          >
            Info Toast
          </BaseButton>
          
          <BaseButton 
            variant="outline"
            @click="toast.warning('Warning: Proceed with caution.')"
          >
            Warning Toast
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- BaseButton Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">Buttons (BaseButton)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">Interactive</span>
      </div>
      <div class="p-6 space-y-8">
        <!-- Variants -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Variants</h3>
          <div class="flex flex-wrap gap-4">
            <BaseButton>Primary</BaseButton>
            <BaseButton variant="secondary">Secondary</BaseButton>
            <BaseButton variant="outline">Outline</BaseButton>
            <BaseButton variant="danger">Danger</BaseButton>
            <BaseButton variant="success">Success</BaseButton>
            <BaseButton variant="ghost">Ghost</BaseButton>
          </div>
        </div>

        <!-- Sizes -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Sizes</h3>
          <div class="flex flex-wrap items-center gap-4">
            <BaseButton size="xs">XS Button</BaseButton>
            <BaseButton size="sm">Small</BaseButton>
            <BaseButton size="md">Medium</BaseButton>
            <BaseButton size="lg">Large</BaseButton>
            <BaseButton size="xl">Extra Large</BaseButton>
          </div>
        </div>

        <!-- States -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">States</h3>
          <div class="flex flex-wrap gap-4">
            <BaseButton :loading="true">Loading</BaseButton>
            <BaseButton disabled>Disabled</BaseButton>
            <BaseButton disabled variant="secondary">Disabled Secondary</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- BaseInput Demo -->
    <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
        <h2 class="text-lg font-medium text-gray-900">Form Inputs (BaseInput)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Form</span>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput 
            label="Username" 
            placeholder="Enter your username" 
            v-model="inputValues.username"
            hint="This will be your public display name."
          />
          
          <BaseInput 
            label="Email" 
            type="email" 
            placeholder="you@example.com" 
            v-model="inputValues.email"
          />

          <BaseInput 
            label="Password" 
            type="password" 
            placeholder="Secret password" 
            v-model="inputValues.password"
          />

          <BaseInput 
            label="Error State" 
            placeholder="Something wrong..." 
            error="This field is required"
            v-model="inputValues.error"
          />

          <BaseInput 
            label="With Prefix" 
            placeholder="Search..." 
            v-model="inputValues.search"
          >
            <template #prefix>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </template>
          </BaseInput>

          <BaseInput 
            label="Disabled" 
            placeholder="Can't touch this" 
            disabled
            v-model="inputValues.disabled"
          />
        </div>
      </div>
    </section>

    <!-- BaseCard Demo -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Card Components (BaseCard)</h2>
        <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Container</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseCard title="Simple Card" subtitle="With a subtitle">
          <p class="text-gray-600">
            This is a simple card component with a title and subtitle. It uses the default slot for content.
          </p>
        </BaseCard>

        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Custom Header</h3>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </template>
          <p class="text-gray-600">
            This card has a custom header slot for more complex layouts.
          </p>
          <template #footer>
            <div class="flex justify-end">
              <BaseButton size="sm" variant="outline">View Details</BaseButton>
            </div>
          </template>
        </BaseCard>
      </div>
    </section>

    <!-- Advanced Components Demo -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Advanced Components</h2>
        <span class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">Experimental</span>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">TSX Component (TsxButton)</h3>
        <p class="text-gray-600 mb-4">
          A component written in TSX (JSX for Vue) demonstrating full TypeScript support.
        </p>
        <div class="flex gap-4">
          <TsxButton>Default TSX Button</TsxButton>
          <TsxButton variant="primary">Primary TSX Button</TsxButton>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Styled Component (StyledButton)</h3>
        <p class="text-gray-600 mb-4">
          A component built using <code>vue3-styled-components</code> for CSS-in-JS styling.
        </p>
        <div class="flex gap-4 items-center">
          <StyledButton>Default Styled</StyledButton>
          <StyledButton :primary="true">Primary Styled</StyledButton>
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

const inputValues = reactive({
  username: '',
  email: '',
  password: '',
  error: '',
  search: '',
  disabled: ''
})
</script>
