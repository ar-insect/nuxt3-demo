<template>
  <div class="utils-demo">
    <h1>工具类演示</h1>
    
    <section>
      <h2>日期工具 (utils/date.ts)</h2>
      <div class="demo-item">
        <p>当前时间 (formatDateTime): {{ formatDateTime(now) }}</p>
        <p>当前日期 (formatDate): {{ formatDate(now) }}</p>
        <p>相对时间 (timeAgo - 5分钟前): {{ timeAgo(fiveMinutesAgo) }}</p>
      </div>
    </section>

    <section>
      <h2>验证工具 (utils/validator.ts)</h2>
      <div class="demo-item">
        <p>验证邮箱 (test@example.com): {{ isEmail('test@example.com') }}</p>
        <p>验证手机 (13800138000): {{ isMobile('13800138000') }}</p>
        <p>验证空值 (null): {{ isEmpty(null) }}</p>
      </div>
    </section>

    <section>
      <h2>格式化工具 (utils/format.ts)</h2>
      <div class="demo-item">
        <p>格式化金额 (123456.789): {{ formatCurrency(123456.789) }}</p>
        <p>格式化数字 (1000000): {{ formatNumber(1000000) }}</p>
        <p>手机号脱敏 (13800138000): {{ maskPhone('13800138000') }}</p>
      </div>
    </section>

    <section>
      <h2>通用工具 (utils/common.ts)</h2>
      <div class="demo-item">
        <p>点击防抖测试 (请快速点击): <button @click="handleDebounceClick">点击我 ({{ debounceCount }})</button></p>
        <p>点击节流测试 (请快速点击): <button @click="handleThrottleClick">点击我 ({{ throttleCount }})</button></p>
      </div>
    </section>

    <div style="margin-top: 20px;">
      <NuxtLink to="/">返回首页</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const now = new Date()
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

const debounceCount = ref(0)
const throttleCount = ref(0)

const handleDebounceClick = debounce(() => {
  debounceCount.value++
}, 500)

const handleThrottleClick = throttle(() => {
  throttleCount.value++
}, 1000)
</script>

<style scoped>
.utils-demo {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
section {
  margin-bottom: 2rem;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
}
h2 {
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}
.demo-item p {
  margin: 0.5rem 0;
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
