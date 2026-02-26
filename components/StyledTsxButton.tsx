import { defineComponent } from 'vue'
import styled from 'vue3-styled-components'

// 定义 Props 类型
const btnProps = {
  variant: {
    type: String,
    default: 'primary'
  }
}

// 创建 Styled Component
const ButtonContainer = styled('button', btnProps as any)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  
  /* 动态样式 */
  background: ${props => {
    switch(props.variant) {
      case 'danger': return '#ef4444';
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  }};
  
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }
`

const ButtonLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`

// 使用 defineComponent 组合 Styled Components
export default defineComponent({
  name: 'StyledTsxButton',
  props: {
    variant: {
      type: String,
      default: 'primary' // primary, success, warning, danger
    },
    label: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => (
      <ButtonContainer variant={props.variant}>
        <ButtonLabel>
          {slots.icon && slots.icon()}
          {props.label}
        </ButtonLabel>
      </ButtonContainer>
    )
  }
})
