import * as React from 'react'
import * as Styled from './Button.styles'

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest}) => {
  return (
    <Styled.Button {...rest}> 
      {children}
    </Styled.Button>
  )
}

export default Button