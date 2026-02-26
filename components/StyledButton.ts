import styled from 'vue3-styled-components'

const btnProps = {
  primary: {
    type: Boolean,
    default: false
  }
}

// 使用 as any 绕过 vue3-styled-components 的类型推断问题，确保 props 可选
const StyledButton = styled('button', btnProps as any)`
  background: ${props => props.primary ? '#00dc82' : 'white'};
  color: ${props => props.primary ? 'white' : '#00dc82'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00dc82;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

export default StyledButton
