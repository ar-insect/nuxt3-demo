# Nuxt 3 模块化开发模板

本项目基于 Nuxt 3 构建，采用模块化目录结构，旨在提供清晰、可维护的开发体验。

## 目录结构说明

为了实现合理的模块化开发，我们规范了以下目录结构：

-   **`modules/`**: 业务模块目录 (推荐)
    -   `user/`: 用户模块示例
        -   `pages/`: 模块路由
        -   `components/`: 模块组件
        -   `composables/`: 模块逻辑
        -   `middleware/`: 模块中间件
-   **`assets/`**: 静态资源目录
    -   `css/`: 全局样式文件 (如 `main.css`)
    -   `images/`: 图片资源
-   **`components/`**: 全局 Vue 组件目录
    -   推荐按模块分组，例如 `components/user/UserProfile.vue`，使用时为 `<UserUserProfile />`
    -   通用组件可直接放在根目录或 `components/common/`
-   **`composables/`**: 全局组合式函数
    -   利用 Nuxt 的自动导入特性，存放复用的逻辑
    -   推荐按功能命名，如 `useUser.ts`, `useAuth.ts`
-   **`layouts/`**: 页面布局
    -   `default.vue`: 默认布局
-   **`middleware/`**: 全局路由中间件
-   **`pages/`**: 根应用路由
    -   `index.vue`: 首页
-   **`plugins/`**: Nuxt 插件
-   **`public/`**: 纯静态文件
-   **`server/`**: 服务端 API
-   **`utils/`**: 工具函数

## 模块化开发指南

### 推荐：基于 Layers 的模块化 (Local Modules)

为了实现更好的代码隔离和组织，我们采用了 **Nuxt Layers** 的概念。你可以在 `modules/` 目录下创建独立的业务模块。

**示例结构 (`modules/user/`)**:
```
modules/user/
├── components/     # 仅属于该模块的组件 (自动导入)
│   └── UserCard.vue
├── composables/    # 仅属于该模块的逻辑 (自动导入)
│   └── useUser.ts
├── middleware/     # 模块级中间件
│   └── auth.ts
├── pages/          # 模块路由
│   └── user/
│       └── index.vue  -> 路由地址: /user
└── nuxt.config.ts  # 模块配置 (可选)
```

**启用模块**:
在根目录的 `nuxt.config.ts` 中通过 `extends` 引入模块：
```ts
export default defineNuxtConfig({
  extends: [
    './modules/user'
  ]
})
```

### 全局资源模块化 (传统方式)

如果你不想使用独立的 `modules` 目录，仍然可以在全局目录下通过命名规范进行模块化：

#### 组件模块化
在 `components` 目录下，建议根据业务领域创建子目录：

```
components/
  ├── common/       # 通用组件
  │   └── Button.vue
  ├── user/         # 用户模块组件
  │   ├── Avatar.vue
  │   └── Profile.vue
  └── product/      # 产品模块组件
      └── List.vue
```

使用时，Nuxt 会自动根据路径生成组件名（PascalCase）：
- `<CommonButton />`
- `<UserAvatar />`
- `<ProductList />`

#### 逻辑复用模块化
在 `composables` 目录下，同样建议按功能拆分文件：

```
composables/
  ├── useAuth.ts    # 认证相关逻辑
  └── useProduct.ts # 产品相关逻辑
```

## 工具类 (Utils)

本项目在 `utils/` 目录下提供了一系列常用的工具函数，Nuxt 会自动导入，可在项目中直接使用。

### 1. 日期工具 (`utils/date.ts`)
- `formatDate(date)`: 格式化为 YYYY-MM-DD
- `formatDateTime(date)`: 格式化为 YYYY-MM-DD HH:mm:ss
- `timeAgo(date)`: 获取相对时间 (如：刚刚，5分钟前)

### 2. 验证工具 (`utils/validator.ts`)
- `isEmail(email)`: 验证邮箱格式
- `isMobile(phone)`: 验证手机号格式
- `isUrl(url)`: 验证 URL 格式
- `isEmpty(value)`: 验证是否为空 (支持 null, undefined, '', [], {})

### 3. 格式化工具 (`utils/format.ts`)
- `formatCurrency(amount)`: 格式化金额 (¥1,234.56)
- `formatNumber(num)`: 数字千分位 (1,234,567)
- `maskPhone(phone)`: 手机号脱敏 (138****8000)

### 4. 通用工具 (`utils/common.ts`)
- `debounce(fn, delay)`: 防抖函数
- `throttle(fn, limit)`: 节流函数
- `deepClone(obj)`: 对象深拷贝

### 5. HTTP 请求工具 (`utils/http.ts`)
基于 `$fetch` 封装的统一请求类，支持拦截器、文件上传下载等。
- `http.get(url, params)`: 发送 GET 请求
- `http.post(url, body)`: 发送 POST 请求
- `http.upload(url, file)`: 文件上传
- `http.download(url, filename)`: 文件下载

## 全局组件 (Global Components)

本项目提供了一些常用的全局组件，已配置自动导入，可直接在模板中使用。

### 1. 弹窗组件 (`<BaseModal />`)
通用弹窗组件，支持插槽自定义内容。
```vue
<BaseModal v-model="show" title="标题">
  <p>内容...</p>
</BaseModal>
```

### 2. 加载组件 (`<BaseLoading />`)
通用加载状态组件，可全屏或局部覆盖。
```vue
<BaseLoading :loading="isLoading" text="加载中..." />
```

### 3. 消息提示 (`<BaseToast />` & `useToast`)
轻量级消息提示组件，配合 `useToast` 组合式函数使用。
```ts
const toast = useToast()
toast.success('操作成功')
toast.error('发生错误')
```

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
