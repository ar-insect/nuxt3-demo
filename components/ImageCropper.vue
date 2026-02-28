<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
    <div class="bg-white rounded-lg shadow-xl overflow-hidden max-w-2xl w-full flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">裁剪图片</h3>
        <button @click="onCancel" class="text-gray-400 hover:text-gray-500 focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Cropper Area -->
      <div class="flex-1 p-4 bg-gray-100 overflow-hidden relative" style="min-height: 400px;">
        <img ref="imageRef" :src="src" class="max-w-full block" alt="Source Image" />
      </div>

      <!-- Controls & Footer -->
      <div class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <div class="flex gap-2">
          <button type="button" @click="rotate(-90)" class="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100" title="向左旋转">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button type="button" @click="rotate(90)" class="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100" title="向右旋转">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
            </svg>
          </button>
          <button type="button" @click="reset" class="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100" title="重置">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div class="flex gap-3">
          <button
            type="button"
            @click="onCancel"
            class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            取消
          </button>
          <button
            type="button"
            @click="onConfirm"
            class="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            裁剪并上传
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

const props = defineProps<{
  src: string
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'crop', blob: Blob): void
}>()

const imageRef = ref<HTMLImageElement | null>(null)
let cropper: Cropper | null = null

const initCropper = () => {
  if (imageRef.value) {
    cropper = new Cropper(imageRef.value, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 0.8,
      restore: false,
      guides: true,
      center: true,
      highlight: false,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
    })
  }
}

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        if (cropper) {
          cropper.replace(props.src)
        } else {
          initCropper()
        }
      })
    } else {
      if (cropper) {
        cropper.destroy()
        cropper = null
      }
    }
  }
)

onUnmounted(() => {
  if (cropper) {
    cropper.destroy()
  }
})

const rotate = (deg: number) => {
  cropper?.rotate(deg)
}

const reset = () => {
  cropper?.reset()
}

const onCancel = () => {
  emit('update:visible', false)
}

const onConfirm = () => {
  if (!cropper) return
  cropper.getCroppedCanvas({
    width: 300,
    height: 300,
    imageSmoothingQuality: 'high'
  }).toBlob((blob) => {
    if (blob) {
      emit('crop', blob)
      emit('update:visible', false)
    }
  }, 'image/jpeg', 0.9)
}
</script>

<style scoped>
/* Ensure image fits within container */
img {
  max-width: 100%;
}
</style>