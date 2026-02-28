<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">样式组件演示</h1>
      <p class="mt-2 text-lg text-gray-500">
        使用 vue3-styled-components 为 Vue 3 提供 CSS-in-JS 样式。
      </p>
    </div>

    <!-- Live Demo Card -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <h2 class="text-lg font-medium text-gray-900">实时组件</h2>
      </div>
      <div class="p-8 flex flex-col items-center justify-center bg-gray-50/50 gap-6">
        <div class="flex items-center gap-4">
          <StyledButton>普通按钮</StyledButton>
          <StyledButton primary>主要按钮</StyledButton>
        </div>
        <p class="text-sm text-gray-500">
          尝试悬停在按钮上以查看样式组件中定义的过渡效果。
        </p>
      </div>
    </div>

    <!-- Code Example -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm">
      <div class="border-b border-gray-800 bg-gray-900 px-6 py-4 flex justify-between items-center">
        <h2 class="text-sm font-medium text-gray-400">components/StyledButton.ts</h2>
        <span class="text-xs text-gray-500">TypeScript</span>
      </div>
      <div class="p-6 overflow-x-auto">
        <pre class="text-sm font-mono text-gray-300"><code>import styled from 'vue3-styled-components'

const btnProps = {
  primary: {
    type: Boolean,
    default: false
  }
}

const StyledButton = styled('button', btnProps)`
  background: ${props => props.primary ? '#00dc82' : 'white'};
  color: ${props => props.primary ? 'white' : '#00dc82'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00dc82;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`

export default StyledButton</code></pre>
      </div>
    </div>

    <!-- TSX Integration Section -->
    <div class="border-b border-gray-200 pb-5 pt-8">
      <h2 class="text-2xl font-bold leading-tight text-gray-900">带 TSX 的样式组件</h2>
      <p class="mt-2 text-lg text-gray-500">
        在 TSX 文件中使用样式组件以实现强大的组件组合。
      </p>
    </div>

    <!-- TSX Live Demo -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <h2 class="text-lg font-medium text-gray-900">TSX 组件演示</h2>
      </div>
      <div class="p-8 flex flex-col items-center justify-center bg-gray-50/50 gap-6">
        <div class="flex flex-wrap gap-4 justify-center">
          <StyledTsxButton label="主要" variant="primary" />
          <StyledTsxButton label="成功" variant="success" />
          <StyledTsxButton label="警告" variant="warning" />
          <StyledTsxButton label="危险" variant="danger" />
        </div>
      </div>
    </div>

    <!-- TSX Code Example -->
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm">
      <div class="border-b border-gray-800 bg-gray-900 px-6 py-4 flex justify-between items-center">
        <h2 class="text-sm font-medium text-gray-400">components/StyledTsxButton.tsx</h2>
        <span class="text-xs text-gray-500">TSX</span>
      </div>
      <div class="p-6 overflow-x-auto">
        <pre class="text-sm font-mono text-gray-300"><code>import { defineComponent } from 'vue'
import styled from 'vue3-styled-components'

const btnProps = {
  variant: {
    type: String,
    default: 'primary'
  }
}

const ButtonContainer = styled('button', btnProps)`
  /* styles based on variant */
  background: ${props => {
    switch(props.variant) {
      case 'danger': return '#ef4444';
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  }};
  /* ... other styles */
`

export default defineComponent({
  name: 'StyledTsxButton',
  props: {
    variant: { type: String, default: 'primary' },
    label: { type: String, required: true }
  },
  setup(props) {
    return () => (
      &lt;ButtonContainer variant={props.variant}&gt;
        {props.label}
      &lt;/ButtonContainer&gt;
    )
  }
})</code></pre>
      </div>
    </div>

    <!-- Info Section -->
    <div class="rounded-xl bg-purple-50 p-6 text-purple-900 border border-purple-100">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-purple-800">About Styled Components</h3>
          <div class="mt-2 text-sm text-purple-700">
            <p>
              Styled-components allows you to write actual CSS code to style your components. 
              It removes the mapping between components and styles – using components as a low-level styling construct.
            </p>
            <p class="mt-2">
              <strong>Note on SSR:</strong> We've configured a global <code>ThemeProvider</code> in <code>app.vue</code> to ensure styles are correctly injected and to avoid hydration warnings.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StyledButton from '~/components/StyledButton'
import StyledTsxButton from '~/components/StyledTsxButton'
</script>
