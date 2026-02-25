import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../../components/common/BaseModal.vue'

describe('BaseModal', () => {
  it('should render when modelValue is true', () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        title: 'Test Modal'
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    })
    
    expect(wrapper.find('.modal-mask').exists()).toBe(true)
    expect(wrapper.text()).toContain('Test Modal')
  })

  it('should not render when modelValue is false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: false
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    })
    
    expect(wrapper.find('.modal-mask').exists()).toBe(false)
  })

  it('should emit update:modelValue(false) and cancel when close button is clicked', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    })
    
    await wrapper.find('.close-btn').trigger('click')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('should emit confirm when confirm button is clicked', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    })
    
    await wrapper.find('.btn-primary').trigger('click')
    
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('should close on mask click if closeOnMask is true', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        closeOnMask: true
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    })
    
    await wrapper.find('.modal-mask').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('should not close on mask click if closeOnMask is false', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        closeOnMask: false
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: true
        }
      }
    })
    
    await wrapper.find('.modal-mask').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
