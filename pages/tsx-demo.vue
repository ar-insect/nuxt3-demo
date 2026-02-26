<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">TSX Support Demo</h1>
      <p class="mt-2 text-lg text-gray-500">
        Using JSX/TSX syntax in Vue 3 with Nuxt 3.
      </p>
    </div>

    <!-- Live Demo Card -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <h2 class="text-lg font-medium text-gray-900">Live Component</h2>
      </div>
      <div class="p-8 flex items-center justify-center bg-gray-50/50">
        <TsxHello message="Hello from TSX!" />
      </div>
    </div>

    <!-- Code Example -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm">
      <div class="border-b border-gray-800 bg-gray-900 px-6 py-4 flex justify-between items-center">
        <h2 class="text-sm font-medium text-gray-400">components/TsxHello.tsx</h2>
        <span class="text-xs text-gray-500">TypeScript</span>
      </div>
      <div class="p-6 overflow-x-auto">
        <pre class="text-sm font-mono text-gray-300"><code>import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TsxHello',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return () => (
      &lt;div class="p-4 bg-blue-100 text-blue-800 rounded-lg shadow-sm border border-blue-200"&gt;
        &lt;h3 class="font-bold text-lg mb-2"&gt;TSX Component&lt;/h3&gt;
        &lt;p&gt;{props.message}&lt;/p&gt;
      &lt;/div&gt;
    )
  }
})</code></pre>
      </div>
    </div>

    <!-- Info Section -->
    <div class="rounded-xl bg-blue-50 p-6 text-blue-900 border border-blue-100">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-blue-800">Why use TSX?</h3>
          <div class="mt-2 text-sm text-blue-700">
            <p>
              TSX is great for complex render logic where templates become unwieldy. 
              It provides full TypeScript support in your render functions and allows you to use the full power of JavaScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TsxHello is auto-imported
</script>
