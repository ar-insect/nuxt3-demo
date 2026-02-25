// 全局类型定义文件
// 这里定义的类型可以在整个项目中直接使用，无需 import

/**
 * 通用 API 响应结构
 */
declare interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  timestamp?: number
}

/**
 * 分页参数接口
 */
declare interface PageParams {
  page: number
  pageSize: number
}

/**
 * 分页响应结构
 */
declare interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * 全局用户接口示例
 */
declare interface IUser {
  id: number | string
  username: string
  email?: string
  role: 'admin' | 'user' | 'guest'
  avatar?: string
}
