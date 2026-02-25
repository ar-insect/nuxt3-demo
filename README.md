# Nuxt 3 模块化开发模板

本项目基于 Nuxt 3 构建，采用模块化目录结构，集成了常用的工具类、全局组件、插件和调试配置，旨在提供清晰、可维护的开发体验。

## 🚀 特性

- **模块化架构**: 支持基于 Nuxt Layers (Local Modules) 的业务模块隔离。
- **工具类库**: 内置日期处理、HTTP 请求、表单验证、格式化等常用工具。
- **全局组件**: 封装了弹窗 (Modal)、消息提示 (Toast)、加载 (Loading) 等常用组件。
- **插件系统**: 演示了如何创建和使用全局插件。
- **中间件**: 包含全局路由中间件示例。
- **TypeScript**: 完善的类型定义和类型扩展。
- **调试配置**: 预配置 VS Code `launch.json`，支持客户端和服务端断点调试。
- **SSR 支持**: 包含服务端渲染 API 和页面调试示例。

## 📂 目录结构

```bash
├── .vscode/            # VS Code 调试配置
├── assets/             # 静态资源 (CSS, Images)
├── components/         # 全局组件
│   ├── common/         # 通用组件 (BaseModal, BaseToast, BaseLoading)
│   └── ...
├── composables/        # 组合式函数 (useToast, useHello)
├── layouts/            # 页面布局
├── middleware/         # 路由中间件 (logger.global.ts)
├── modules/            # 业务模块 (Nuxt Layers)
│   └── user/           # 用户模块示例
├── pages/              # 页面路由 (包含各类 Demo)
├── plugins/            # Nuxt 插件
├── public/             # 静态文件
├── server/             # 服务端 API
├── types/              # 全局类型定义 (.d.ts)
├── utils/              # 工具函数 (http, date, validator, format)
├── app.vue             # 应用入口
└── nuxt.config.ts      # 项目配置
```

## 🛠️ 功能模块详解

### 1. 模块化开发 (Modules)
我们在 `modules/` 目录下实现了业务模块的物理隔离。以 `modules/user` 为例，它拥有独立的 `pages`、`components` 和 `composables`，通过 `nuxt.config.ts` 的 `extends` 特性引入。

### 2. 工具类 (Utils)
位于 `utils/` 目录，Nuxt 自动导入，可直接使用：
- **`$Http`**: 基于 `ofetch` 封装的 HTTP 请求工具，支持拦截器、文件上传/下载。
- **`formatDate`**: 日期格式化。
- **`Validator`**: 表单验证 (手机号、邮箱等)。
- **`formatMoney`**: 金额格式化。

### 3. 全局组件 (Components)
位于 `components/common/`，开箱即用：
- **`<BaseModal>`**: 通用弹窗组件。
- **`<BaseToast>`**: 消息提示组件 (配合 `useToast` 使用)。
- **`<BaseLoading>`**: 加载状态组件。

### 4. 插件 (Plugins)
位于 `plugins/`，示例 `test-plugin.ts` 展示了如何注入全局辅助函数 `$myHelper`。

### 5. 类型定义 (Types)
- **`types/global.d.ts`**: 定义全局通用的接口 (如 `ApiResponse`, `IUser`)。
- **`types/plugins.d.ts`**: 扩展 NuxtApp 和 Vue 实例的类型定义。

## 💻 调试指南

本项目已配置 `.vscode/launch.json`，支持在 VS Code 中进行全栈调试。

1.  **启动调试**:
    -   按 `F5` 或点击调试面板。
    -   选择 **"server: nuxt"** (推荐) 启动服务，支持服务端断点。
    -   或者选择 **"client: chrome"** 调试客户端代码。

2.  **服务端调试**:
    -   在 `server/api/` 或 `app.vue` 的 script setup 中打断点。
    -   访问对应页面触发逻辑。

## 🔗 演示页面

启动项目后，访问以下路径查看功能演示：

- **`/`**: 首页
- **`/user`**: 用户模块示例 (来自 `modules/user`)
- **`/utils-demo`**: 工具函数演示 (日期、验证、格式化)
- **`/http-demo`**: HTTP 请求演示 (GET, POST, 上传, 下载)
- **`/components-demo`**: 全局组件演示 (弹窗, Toast, Loading)
- **`/ssr-demo`**: 服务端渲染 (SSR) 调试
- **`/plugins-demo`**: 插件功能演示
- **`/types-demo`**: 全局类型定义演示

## 📦 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产环境
npm run build

# 预览生产环境
npm run preview
```
