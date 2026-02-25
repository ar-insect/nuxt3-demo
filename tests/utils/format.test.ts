import { describe, it, expect } from 'vitest'
import { formatCurrency, formatNumber, maskPhone } from '../../utils/format'

describe('Format Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('¥1,234.56')
      expect(formatCurrency(100, '$', 0)).toBe('$100')
    })

    it('should handle invalid input', () => {
      expect(formatCurrency('abc')).toBe('¥0.00')
    })
  })

  describe('formatNumber', () => {
    it('should format number with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567')
      expect(formatNumber(100)).toBe('100')
    })
  })

  describe('maskPhone', () => {
    it('should mask phone number correctly', () => {
      expect(maskPhone('13812345678')).toBe('138****5678')
    })

    it('should return original if phone number is too short', () => {
      expect(maskPhone('123')).toBe('123')
    })
  })
})
