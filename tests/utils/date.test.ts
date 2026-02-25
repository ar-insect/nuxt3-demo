import { describe, it, expect } from 'vitest'
import { formatDate, formatDateTime, timeAgo } from '../../utils/date'

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-01-01T12:00:00')
      expect(formatDate(date)).toBe('2023-01-01')
    })

    it('should handle timestamp', () => {
      const timestamp = new Date('2023-10-15').getTime()
      expect(formatDate(timestamp)).toBe('2023-10-15')
    })

    it('should return empty string for invalid date', () => {
      expect(formatDate('invalid')).toBe('')
      expect(formatDate(null as any)).toBe('')
    })
  })

  describe('formatDateTime', () => {
    it('should format date time correctly', () => {
      const date = new Date('2023-01-01T13:30:45')
      expect(formatDateTime(date)).toBe('2023-01-01 13:30:45')
    })
  })

  describe('timeAgo', () => {
    it('should return "刚刚" for recent time', () => {
      expect(timeAgo(new Date())).toBe('刚刚')
    })

    it('should return correct minutes ago', () => {
      const now = new Date()
      const fiveMinsAgo = new Date(now.getTime() - 5 * 60 * 1000)
      expect(timeAgo(fiveMinsAgo)).toBe('5分钟前')
    })
  })
})
