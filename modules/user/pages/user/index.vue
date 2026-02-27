<template>
  <div class="user-page">
    <h2>User Module Page</h2>
    <p>This page is located in <code>modules/user/pages/user/index.vue</code></p>
    <UserCard />
    <NuxtLink to="/">Back to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})
</script>

<style scoped>
.user-page {
  padding: 2rem;
}
</style>
