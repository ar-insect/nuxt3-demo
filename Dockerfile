# 使用 Node.js 20 Alpine 作为基础镜像
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm ci

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 运行阶段
FROM node:20-alpine AS runner

WORKDIR /app

# 复制构建产物
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# 启动应用
CMD ["node", ".output/server/index.mjs"]
