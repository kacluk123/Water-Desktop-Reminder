import * as React from 'react'
import * as Styled from './Toggle.styles'

interface ITogle extends React.ComponentProps<'input'> {
  label: string
}


const Toggle: React.FC<ITogle> = ({ label, ref, ...rest}) => {
  return (
    <Styled.ToggleContainer>
      <Styled.ToggleLabel>
        {label}
      </Styled.ToggleLabel>
      <Styled.Toggle>
        <Styled.Checkbox type="checkbox" {...rest} />
        <Styled.Slider />
      </Styled.Toggle>
    </Styled.ToggleContainer>
  )
}

export default Toggle