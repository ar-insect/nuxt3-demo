import { describe, it, expect } from 'vitest'
import { isEmail, isMobile, isUrl, isEmpty } from '../../utils/validator'

describe('Validator Utils', () => {
  describe('isEmail', () => {
    it('should validate correct emails', () => {
      expect(isEmail('test@example.com')).toBe(true)
      expect(isEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should invalidate incorrect emails', () => {
      expect(isEmail('invalid-email')).toBe(false)
      expect(isEmail('user@')).toBe(false)
      expect(isEmail('@domain.com')).toBe(false)
    })
  })

  describe('isMobile', () => {
    it('should validate correct mobile numbers', () => {
      expect(isMobile('13800138000')).toBe(true)
      expect(isMobile('19912345678')).toBe(true)
    })

    it('should invalidate incorrect mobile numbers', () => {
      expect(isMobile('1234567890')).toBe(false)
      expect(isMobile('1380013800')).toBe(false)
      expect(isMobile('abc')).toBe(false)
    })
  })

  describe('isUrl', () => {
    it('should validate correct urls', () => {
      expect(isUrl('https://google.com')).toBe(true)
      expect(isUrl('http://localhost:3000')).toBe(true)
    })

    it('should invalidate incorrect urls', () => {
      expect(isUrl('not-a-url')).toBe(false)
    })
  })

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
      expect(isEmpty('  ')).toBe(true)
    })

    it('should return false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty(0)).toBe(false)
    })
  })
})
