<template>
  <div class="bg-white overflow-hidden shadow divide-y divide-gray-200" :style="{ borderRadius: 'var(--border-radius)' }">
    <div v-if="$slots.header || title" class="px-4 py-5 sm:px-6">
      <slot name="header">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ subtitle }}
        </p>
      </slot>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="px-4 py-4 sm:px-6 bg-gray-50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

defineProps<Props>()
</script>
