<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    
    <footer class="bg-white border-t border-gray-100 py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Nuxt3 Demo Project. Built with Nuxt 3 & Tailwind CSS.</p>
      </div>
    </footer>

    <BaseToast />
    <BaseModal />
  </div>
</template>
