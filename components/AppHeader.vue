<template>
  <header class="app-header">
    <nav>
      <ul>
        <li><NuxtLink to="/">首页</NuxtLink></li>
        <li><NuxtLink to="/user">用户模块</NuxtLink></li>
        <li><NuxtLink to="/utils-demo">工具类演示</NuxtLink></li>
        <li><NuxtLink to="/http-demo">HTTP 请求演示</NuxtLink></li>
        <li><NuxtLink to="/components-demo">全局组件演示</NuxtLink></li>
        <li><NuxtLink to="/ssr-demo">SSR 调试</NuxtLink></li>
        <li><NuxtLink to="/plugins-demo">插件演示</NuxtLink></li>
        <li><NuxtLink to="/types-demo">类型演示</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #fff;
  padding: 0 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 64px;
  display: flex;
  align-items: center;
}

nav {
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2rem;
}

li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

li a:hover,
li a.router-link-active {
  color: #00dc82;
  border-bottom-color: #00dc82;
}
</style>
