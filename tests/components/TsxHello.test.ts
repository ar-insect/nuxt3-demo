import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TsxHello from '../../components/TsxHello'

describe('TsxHello', () => {
  it('renders correctly', () => {
    const wrapper = mount(TsxHello, {
      props: {
        message: 'Test Message'
      }
    })
    expect(wrapper.text()).toContain('Test Message')
    expect(wrapper.text()).toContain('Current count: 0')
  })

  it('increments count on click', async () => {
    const wrapper = mount(TsxHello)
    const button = wrapper.find('button')
    
    await button.trigger('click')
    expect(wrapper.text()).toContain('Current count: 1')
  })
})
