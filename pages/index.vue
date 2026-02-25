<template>
  <div class="page-index">
    <h1>首页</h1>
    <p>{{ message }}</p>
    <div style="margin-top: 20px;">
      <NuxtLink to="/user">前往用户模块</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const message = useHello()
</script>
