<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">TSX Support Demo</h1>
    
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">TSX Component Usage</h2>
      <TsxHello message="This is a TSX component!" />
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Description</h2>
      <p class="text-gray-600">
        Nuxt 3 supports TSX/JSX out of the box. You can create components with `.tsx` extension
        and use them directly in your Vue templates.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// TsxHello is auto-imported
</script>
