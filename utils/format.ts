/**
 * 格式化金额
 * @param amount 金额数值
 * @param currency 货币符号，默认为 ¥
 * @param decimals 小数位数，默认为 2
 * @returns string
 */
export const formatCurrency = (amount: number | string, currency: string = '¥', decimals: number = 2): string => {
  const num = Number(amount)
  if (isNaN(num)) return `${currency}0.00`
  return `${currency}${num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

/**
 * 格式化数字（添加千分位）
 * @param num 数值
 * @returns string
 */
export const formatNumber = (num: number | string): string => {
  if (num === null || num === undefined) return ''
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 隐藏手机号中间四位
 * @param phone 手机号
 * @returns string
 */
export const maskPhone = (phone: string): string => {
  if (!phone || phone.length < 11) return phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
