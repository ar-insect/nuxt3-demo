<template>
  <div class="user-card">
    <h3>{{ user.name }}</h3>
    <p>Role: {{ user.role }}</p>
  </div>
</template>

<script setup lang="ts">
const user = useUser()
</script>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f0f0f0;
}
</style>
