<template>
  <div class="max-w-3xl mx-auto">
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-indigo-600 px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 class="text-lg leading-6 font-medium text-white">
            个人中心
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-indigo-100">
            用户详情及个人资料。
          </p>
        </div>
        <button
          @click="logout"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          退出登录
        </button>
      </div>

      <!-- User Info Form -->
      <form @submit.prevent="saveProfile" class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <!-- Avatar Section -->
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 self-center">
              头像
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center space-x-4">
              <div class="relative group">
                <img
                  :src="form.avatar || user?.avatar || 'https://via.placeholder.com/150'"
                  alt="User Avatar"
                  class="h-16 w-16 rounded-full object-cover"
                />
                <div v-if="uploading" class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <label for="avatar-upload" class="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  更换
                </label>
                <input id="avatar-upload" type="file" class="hidden" accept="image/*" @change="handleFileUpload" :disabled="uploading" />
                <p class="mt-1 text-xs text-gray-500">支持 JPG, GIF 或 PNG 格式。</p>
              </div>
            </dd>
          </div>

          <!-- Name Section -->
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 self-center">
              姓名
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                v-model="form.name"
                type="text"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </dd>
          </div>

          <!-- Read-only Fields -->
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              用户名
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user?.username }}
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              角色
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                {{ user?.role }}
              </span>
            </dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">
              用户 ID
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ user?.id }}
            </dd>
          </div>
        </dl>

        <!-- Form Actions -->
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            :disabled="saving"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ saving ? '保存中...' : '保存修改' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Image Cropper Modal -->
    <ClientOnly>
      <ImageCropper
        v-model:visible="showCropper"
        :src="cropperImage"
        @crop="handleCrop"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const { user, logout } = useAuth()
const uploading = ref(false)
const saving = ref(false)
const showCropper = ref(false)
const cropperImage = ref('')

const form = reactive({
  name: user.value?.name || '',
  avatar: user.value?.avatar || ''
})

// Update form when user data is loaded/refreshed
watch(user, (newUser) => {
  if (newUser) {
    form.name = newUser.name
    form.avatar = newUser.avatar
  }
}, { immediate: true })

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  // Verify file type
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    if (e.target?.result) {
      cropperImage.value = e.target.result as string
      showCropper.value = true
    }
  }
  reader.readAsDataURL(file)
  
  // Clear input value to allow re-selecting the same file
  input.value = ''
}

const handleCrop = async (blob: Blob) => {
  const formData = new FormData()
  formData.append('file', blob, 'avatar.jpg')

  uploading.value = true
  try {
    const response = await $fetch<{ data: { url: string } }>('/api/upload', {
      method: 'POST',
      body: formData
    })
    form.avatar = response.data.url
  } catch (error) {
    alert('头像上传失败')
    console.error(error)
  } finally {
    uploading.value = false
  }
}

const saveProfile = async () => {
  saving.value = true
  try {
    const response = await $fetch<{ data: any }>('/api/user/update', {
      method: 'POST',
      body: {
        name: form.name,
        avatar: form.avatar
      }
    })
    
    // Update local user state
    if (user.value) {
      user.value.name = response.data.name
      user.value.avatar = response.data.avatar
    }
    
    alert('资料更新成功')
  } catch (error) {
    alert('资料更新失败')
    console.error(error)
  } finally {
    saving.value = false
  }
}
</script>
