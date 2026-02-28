<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData('docs', () => {
  return queryCollection('content').path('/').first()
})

useSeoMeta({
  title: '项目文档',
  description: 'Nuxt3 演示项目详细文档，包含安装、配置、组件使用等说明。'
})

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    history.pushState(null, '', `#${id}`)
  }
}
</script>

<template>
  <div class="docs-page">
    <div class="container">
      <div class="layout-grid">
        <!-- 主内容 -->
        <main class="content-wrapper">
          <ContentRenderer v-if="page" :value="page" class="markdown-body" />
          <div v-else class="empty-state">
            文档加载失败或内容为空
          </div>
          
          <div class="navigation">
            <NuxtLink to="/" class="back-link">返回首页</NuxtLink>
          </div>
        </main>

        <!-- 右侧 TOC -->
        <aside class="toc-sidebar" v-if="page?.body?.toc?.links?.length">
          <div class="toc-wrapper">
            <h3 class="toc-title">目录</h3>
            <nav class="toc-nav">
              <ul>
                <li v-for="link in page.body.toc.links" :key="link.id">
                  <a :href="`#${link.id}`" @click.prevent="scrollToHeading(link.id)">{{ link.text }}</a>
                  <ul v-if="link.children && link.children.length">
                    <li v-for="child in link.children" :key="child.id">
                      <a :href="`#${child.id}`" @click.prevent="scrollToHeading(child.id)">{{ child.text }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.docs-page {
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9fafb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .layout-grid {
    grid-template-columns: 1fr 250px;
    align-items: start;
  }
  
  .toc-sidebar {
    position: sticky;
    top: 2rem;
  }
}

.content-wrapper {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 0; /* 防止 grid溢出 */
}

.toc-wrapper {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.toc-title {
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.toc-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-nav li {
  margin-bottom: 0.5rem;
}

.toc-nav a {
  text-decoration: none;
  color: #4b5563;
  font-size: 0.9rem;
  display: block;
  padding: 0.25rem 0;
  transition: all 0.2s;
  line-height: 1.4;
}

.toc-nav a:hover {
  color: #2563eb;
  padding-left: 0.25rem;
}

.toc-nav ul ul {
  padding-left: 1rem;
  margin-top: 0.25rem;
  border-left: 2px solid #f3f4f6;
}

.navigation {
  margin-top: 2rem;
  text-align: center;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6b7280;
  font-size: 1.1rem;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ef4444;
  font-size: 1.1rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.back-link:hover {
  background-color: #e5e7eb;
  color: #111827;
}

/* Markdown Styles */
:deep(.markdown-body) {
  color: #374151;
  line-height: 1.6;
}

:deep(.markdown-body h1) {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

:deep(.markdown-body h2) {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(.markdown-body h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

:deep(.markdown-body p) {
  margin-bottom: 1rem;
}

:deep(.markdown-body ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

:deep(.markdown-body ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

:deep(.markdown-body li) {
  margin-bottom: 0.5rem;
}

:deep(.markdown-body code) {
  background-color: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #ef4444;
}

:deep(.markdown-body pre) {
  background-color: #1f2937;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

:deep(.markdown-body pre code) {
  background-color: transparent;
  color: #e5e7eb;
  padding: 0;
}

:deep(.markdown-body a) {
  color: #3b82f6;
  text-decoration: none;
}

:deep(.markdown-body a:hover) {
  text-decoration: underline;
}

:deep(.markdown-body blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin-left: 0;
  color: #6b7280;
  font-style: italic;
}

:deep(.markdown-body table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}

:deep(.markdown-body th),
:deep(.markdown-body td) {
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  text-align: left;
}

:deep(.markdown-body th) {
  background-color: #f9fafb;
  font-weight: 600;
}
</style>
