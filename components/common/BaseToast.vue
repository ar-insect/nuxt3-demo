<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="`toast-${toast.type}`"
        >
          <span class="icon">{{ getIcon(toast.type) }}</span>
          <span class="message">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts } = useToast()

const getIcon = (type: string = 'info') => {
  const icons: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '!',
    info: 'i'
  }
  return icons[type]
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.toast-item {
  padding: 10px 20px;
  border-radius: var(--border-radius);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 300px;
  pointer-events: auto;
}

.toast-success { border-left: 4px solid #00dc82; }
.toast-error { border-left: 4px solid #ff4d4f; }
.toast-warning { border-left: 4px solid #faad14; }
.toast-info { border-left: 4px solid #1890ff; }

.icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  font-size: 12px;
  font-weight: bold;
}

.toast-success .icon { color: #00dc82; background: #f6ffed; }
.toast-error .icon { color: #ff4d4f; background: #fff2f0; }
.toast-warning .icon { color: #faad14; background: #fffbe6; }
.toast-info .icon { color: #1890ff; background: #e6f7ff; }

/* Transition styles */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
