/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns boolean
 */
export const isEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * 验证手机号格式 (中国大陆)
 * @param phone 手机号
 * @returns boolean
 */
export const isMobile = (phone: string): boolean => {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}

/**
 * 验证URL格式
 * @param url URL地址
 * @returns boolean
 */
export const isUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证是否为空 (null, undefined, '', [], {})
 * @param value 任意值
 * @returns boolean
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}
