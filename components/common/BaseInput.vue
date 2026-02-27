<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <div class="relative shadow-sm" :style="{ borderRadius: 'var(--border-radius)' }">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="prefix"></slot>
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 py-2"
        :class="[
          error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : '',
          disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '',
          $slots.prefix ? 'pl-10' : 'pl-3',
          $slots.suffix ? 'pr-10' : 'pr-3'
        ]"
        :style="{ borderRadius: 'var(--border-radius)' }"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <slot name="suffix"></slot>
      </div>
      <div v-if="error && !$slots.suffix" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600" :id="`${id}-error`">
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-2 text-sm text-gray-500" :id="`${id}-description`">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  id?: string
  type?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  id: () => 'input-' + Math.random().toString(36).substr(2, 9),
  disabled: false
})

defineEmits(['update:modelValue'])
</script>
