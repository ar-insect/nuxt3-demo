# Nuxt 3 模块化开发模板

本项目基于 Nuxt 3 构建，采用模块化目录结构，集成了常用的工具类、全局组件、插件和调试配置，旨在提供清晰、可维护的开发体验。

## 🚀 特性

- **模块化架构**: 支持基于 Nuxt Layers (Local Modules) 的业务模块隔离。
- **工具类库**: 内置日期处理、HTTP 请求、表单验证、格式化等常用工具。
- **全局组件**: 封装了弹窗 (Modal)、消息提示 (Toast)、加载 (Loading) 等常用组件。
- **插件系统**: 演示了如何创建和使用全局插件。
- **中间件**: 包含全局路由中间件示例，以及身份验证中间件 (Auth Middleware)。
- **TypeScript**: 完善的类型定义和类型扩展。
- **TSX 支持**: 原生支持使用 TSX/JSX 编写组件。
- **Styled Components**: 集成 `vue3-styled-components` 支持 CSS-in-JS 样式编写。
- **Tailwind CSS**: 集成 Tailwind CSS 进行快速 UI 开发。
- **单元测试**: 集成 Vitest + @nuxt/test-utils 进行单元测试和组件测试。
- **调试配置**: 预配置 VS Code `launch.json`，支持客户端和服务端断点调试。
- **SSR 支持**: 包含服务端渲染 API 和页面调试示例，支持 `useAsyncData` 数据获取。
- **功能演示**: 包含完整的商品列表、详情、购物车、收藏夹及用户中心功能。

## 📂 目录结构

```bash
├── .vscode/            # VS Code 调试配置
├── assets/             # 静态资源 (CSS, Images)
├── components/         # 全局组件
│   ├── common/         # 通用组件 (BaseButton, BaseInput, BaseCard, BaseModal, BaseToast, BaseLoading)
│   └── ...
├── composables/        # 组合式函数 (useAuth, useCart, useWishlist, useProducts, useToast, etc.)
├── layouts/            # 页面布局
├── middleware/         # 路由中间件 (auth.ts, logger.global.ts)
├── modules/            # 业务模块 (Nuxt Layers)
│   └── user/           # 用户模块示例
├── pages/              # 页面路由 (包含各类 Demo 及业务页面)
├── plugins/            # Nuxt 插件
├── public/             # 静态文件
├── scripts/            # 自动化脚本 (deploy.sh)
├── server/             # 服务端 API
├── types/              # 全局类型定义 (.d.ts)
├── utils/              # 工具函数 (http, date, validator, format)
├── app.vue             # 应用入口
├── ecosystem.config.js # PM2 配置文件
└── nuxt.config.ts      # 项目配置
```

## 🛠️ 功能模块详解

### 1. 业务功能模块
- **用户中心**: 包含登录 (`/login`)、个人中心 (`/profile`)，支持身份验证与路由保护。
- **商品系统**: 商品列表 (`/products`)、商品详情 (`/products/[id]`)，支持 SSR 渲染。
- **购物车**: 完整的购物车功能 (`/cart`)，支持添加、修改数量、删除及结算。
- **收藏夹**: 商品收藏功能 (`/wishlist`)，支持收藏/取消收藏。

### 2. 工具类 (Utils)
位于 `utils/` 目录，Nuxt 自动导入，可直接使用：
- **`$Http`**: 基于 `ofetch` 封装的 HTTP 请求工具，支持拦截器、文件上传/下载。
- **`formatDate`**: 日期格式化。
- **`Validator`**: 表单验证 (手机号、邮箱等)。
- **`formatMoney`**: 金额格式化。

### 3. 全局组件 (Components)
位于 `components/common/`，开箱即用：
- **基础组件**: `<BaseButton>`, `<BaseInput>`, `<BaseCard>`
- **交互组件**: `<BaseModal>`, `<BaseToast>`, `<BaseLoading>`

### 4. 组合式函数 (Composables)
- **状态管理**: `useCart`, `useWishlist`, `useAuth`
- **数据获取**: `useProducts`
- **交互反馈**: `useToast`

### 6. 页面布局 (Layouts)
- **`default`**: 默认布局，包含头部导航和底部版权信息。
- **`auth`**: 认证布局，简洁的居中设计，专用于登录/注册页面。
- **`dashboard`**: 仪表盘布局，包含侧边栏导航，适用于个人中心等管理页面。

### 7. 样式方案
- **Tailwind CSS**: 主要样式工具。
- **Styled Components**: 演示 CSS-in-JS 方案 (`pages/styled-demo.vue`)。

## 🧪 单元测试

本项目集成了 **Vitest** 和 **@nuxt/test-utils**，支持对工具函数、组件和组合式函数进行单元测试。

**运行测试**:

```bash
# 运行所有测试
npx vitest run

# 监听模式 (开发时使用)
npx vitest
```

测试覆盖范围包括：
- `tests/utils/*.test.ts`: 日期、验证、格式化等工具函数。
- `tests/components/*.test.ts`: BaseModal, BaseToast 等全局组件。
- `tests/composables/*.test.ts`: useToast 等组合式函数。

## 💻 调试指南

本项目已配置 `.vscode/launch.json`，支持在 VS Code 中进行全栈调试。

1.  **启动调试**:
    -   按 `F5` 或点击调试面板。
    -   选择 **"server: nuxt"** (推荐) 启动服务，支持服务端断点。
    -   或者选择 **"client: chrome"** 调试客户端代码。

2.  **服务端调试**:
    -   在 `server/api/` 或 `app.vue` 的 script setup 中打断点。
    -   访问对应页面触发逻辑。

## 📝 错误日志

本项目集成了全局错误捕获插件 `plugins/error-handler.ts`，并支持将错误日志**持久化存储到 Redis**。

### 配置 Redis

在 `.env` 文件中配置 Redis 连接信息 (可选，默认连接本地 localhost:6379):

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password
REDIS_DB=0
```

### 日志存储

日志将以 JSON 格式存储在 Redis 的 List 结构中，Key 为 `app:logs`。系统会自动保留最近 1000 条日志。

### 捕获类型

1.  **Vue 组件错误**: 生命周期钩子、渲染函数、事件处理器中的异常。
2.  **Nuxt 应用错误**: 插件初始化、中间件、路由守卫中的异常。
3.  **Promise 未捕获异常**: 全局未处理的 Promise Rejection。
4.  **全局脚本错误**: 常规 JS 运行时错误。

**手动记录错误**:

```ts
const { $logError } = useNuxtApp()

try {
  // ...
} catch (e) {
  $logError(e, 'Custom Context')
}
```

**查看日志**:
在开发环境下，错误日志会详细输出到浏览器控制台 (Console)，包含错误类型、堆栈信息、组件名称等结构化数据。

## 🔗 演示页面

启动项目后，访问以下路径查看功能演示：

- **`/`**: 首页
- **`/login`**: 用户登录
- **`/profile`**: 个人中心 (需登录)
- **`/products`**: 商品列表 (SSR)
- **`/cart`**: 购物车
- **`/wishlist`**: 收藏夹
- **`/user`**: 用户模块示例 (来自 `modules/user`)
- **`/utils-demo`**: 工具函数演示
- **`/http-demo`**: HTTP 请求演示
- **`/components-demo`**: 全局组件演示
- **`/ssr-demo`**: 服务端渲染 (SSR) 调试
- **`/tsx-demo`**: TSX 组件演示
- **`/styled-demo`**: Styled Components 演示

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

## 🚀 部署

本项目提供了自动化部署脚本，支持一键构建、打包及本地预览。

```bash
# 执行自动化打包与部署脚本
npm run deploy
# 或者
./scripts/deploy.sh
```

脚本会自动执行：
1. 清理旧构建
2. 安装依赖
3. 构建项目
4. 生成 `release.tar.gz` 部署包
5. (可选) 本地预览运行
