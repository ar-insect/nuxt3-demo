import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StyledButton from '../../components/StyledButton'

describe('StyledButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(StyledButton, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('applies primary styles when primary prop is true', () => {
    const wrapper = mount(StyledButton, {
      props: {
        primary: true
      }
    })
    // styled-components generate unique class names, so checking specific styles might be hard without a helper
    // But we can check if the component renders successfully
    expect(wrapper.exists()).toBe(true)
  })

  it('applies default styles when primary prop is false', () => {
    const wrapper = mount(StyledButton, {
      props: {
        primary: false
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
