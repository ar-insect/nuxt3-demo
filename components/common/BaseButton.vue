<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="!to ? type : undefined"
    :class="[
      'inline-flex items-center justify-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses[size],
      variantClasses[variant],
      block ? 'w-full' : ''
    ]"
    :style="rounded ? { borderRadius: 'var(--border-radius)' } : undefined"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="suffix"></slot>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const NuxtLink = resolveComponent('NuxtLink')

type ButtonType = 'button' | 'submit' | 'reset'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost'

interface Props {
  type?: ButtonType
  size?: ButtonSize
  variant?: ButtonVariant
  block?: boolean
  loading?: boolean
  disabled?: boolean
  rounded?: boolean
  to?: RouteLocationRaw
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  size: 'md',
  variant: 'primary',
  block: false,
  loading: false,
  disabled: false,
  rounded: true,
  to: undefined
})

defineEmits(['click'])

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm leading-4',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm',
  secondary: 'border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500',
  outline: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500 shadow-sm',
  danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-sm',
  success: 'border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-sm',
  ghost: 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:ring-indigo-500'
}
</script>
