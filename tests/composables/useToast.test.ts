import { describe, it, expect, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import { useToast } from '../../composables/useToast'

const useStateMap = new Map()

mockNuxtImport('useState', () => {
  return (key: string, init: () => any) => {
    if (!useStateMap.has(key)) {
      useStateMap.set(key, ref(init()))
    }
    return useStateMap.get(key)
  }
})

describe('useToast', () => {
  beforeEach(() => {
    useStateMap.clear()
  })

  it('should add a toast', () => {
    const { show, toasts } = useToast()
    show('test message')
    expect(toasts.value.length).toBe(1)
    expect(toasts.value[0].message).toBe('test message')
    expect(toasts.value[0].type).toBe('info')
  })

  it('should add a success toast', () => {
    const { success, toasts } = useToast()
    success('success message')
    expect(toasts.value.length).toBe(1)
    expect(toasts.value[0].type).toBe('success')
  })

  it('should remove a toast', () => {
    const { show, remove, toasts } = useToast()
    const id = show('test message')
    expect(toasts.value.length).toBe(1)
    
    remove(id)
    expect(toasts.value.length).toBe(0)
  })

  it('should clear all toasts', () => {
    const { show, clear, toasts } = useToast()
    show('msg 1')
    show('msg 2')
    expect(toasts.value.length).toBe(2)
    
    clear()
    expect(toasts.value.length).toBe(0)
  })
})
