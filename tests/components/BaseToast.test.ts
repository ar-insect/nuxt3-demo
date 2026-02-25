import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import BaseToast from '../../components/common/BaseToast.vue'

// Mock useToast
const toasts = ref<any[]>([])
vi.mock('~/composables/useToast', () => ({
  useToast: () => ({
    toasts
  })
}))

describe('BaseToast', () => {
  beforeEach(() => {
    toasts.value = []
  })

  it('should render toasts', async () => {
    toasts.value = [
      { id: '1', message: 'info msg', type: 'info' },
      { id: '2', message: 'success msg', type: 'success' }
    ]
    
    const wrapper = mount(BaseToast, {
      global: {
        stubs: {
          Teleport: true,
          TransitionGroup: false // Don't stub TransitionGroup to render children
        }
      }
    })
    
    expect(wrapper.findAll('.toast-item').length).toBe(2)
    expect(wrapper.text()).toContain('info msg')
    expect(wrapper.text()).toContain('success msg')
    expect(wrapper.find('.toast-info').exists()).toBe(true)
    expect(wrapper.find('.toast-success').exists()).toBe(true)
  })

  it('should show correct icon for types', async () => {
    toasts.value = [{ id: '1', message: 'test', type: 'success' }]
    const wrapper = mount(BaseToast, {
      global: {
        stubs: { Teleport: true }
      }
    })
    
    expect(wrapper.find('.icon').text()).toBe('✓')
  })
})
