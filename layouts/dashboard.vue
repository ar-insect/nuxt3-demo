<template>
  <div class="min-h-screen bg-gray-100 font-sans text-gray-900">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <aside class="hidden w-64 flex-col overflow-y-auto border-r border-gray-200 bg-white md:flex">
        <div class="flex h-16 items-center justify-center border-b border-gray-200 px-6">
          <NuxtLink to="/" class="text-xl font-bold text-indigo-600">Nuxt3 演示</NuxtLink>
        </div>
        <div class="flex flex-1 flex-col overflow-y-auto">
          <nav class="flex-1 space-y-1 px-2 py-4">
            <NuxtLink to="/" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
              <svg class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              首页
            </NuxtLink>

            <NuxtLink to="/profile" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900" active-class="bg-gray-100 text-gray-900">
              <svg class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              个人中心
            </NuxtLink>

            <NuxtLink to="/cart" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900" active-class="bg-gray-100 text-gray-900">
              <svg class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              购物车
            </NuxtLink>

            <NuxtLink to="/wishlist" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900" active-class="bg-gray-100 text-gray-900">
              <svg class="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              收藏夹
            </NuxtLink>
          </nav>
        </div>
      </aside>

      <!-- Main content -->
      <div class="flex flex-1 flex-col overflow-hidden">
        <header class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div class="flex items-center md:hidden">
            <button class="text-gray-500 focus:outline-none lg:hidden">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <span class="ml-4 text-lg font-bold text-gray-900">Nuxt3 演示</span>
          </div>
          <div class="flex items-center">
             <!-- Top bar actions can go here -->
             <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-900 mr-4">返回首页</NuxtLink>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
          <slot />
        </main>
      </div>
    </div>
    
    <BaseToast />
    <BaseModal />
  </div>
</template>
