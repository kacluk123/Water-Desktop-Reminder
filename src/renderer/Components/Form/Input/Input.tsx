import * as React from 'react'

import * as Styled from './Input.styles'

interface IInput extends React.ComponentProps<'input'> {
  label: string
}

export const Input: React.FC<IInput> = ({ label, ref, ...rest}) => {
  return (
    <Styled.InputContainer>
      <Styled.Label>
        {label}
      </Styled.Label>
      <Styled.Input {...rest} />
    </Styled.InputContainer>
  )
}

export default Input