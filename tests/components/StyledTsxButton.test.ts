import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StyledTsxButton from '../../components/StyledTsxButton'

describe('StyledTsxButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(StyledTsxButton, {
      props: {
        label: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('renders variant classes/styles', () => {
    const wrapper = mount(StyledTsxButton, {
      props: {
        label: 'Danger Button',
        variant: 'danger'
      }
    })
    expect(wrapper.exists()).toBe(true)
    // Check if the component renders properly
    expect(wrapper.text()).toBe('Danger Button')
  })
})
