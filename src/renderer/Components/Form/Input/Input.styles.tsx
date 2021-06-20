import styled from 'styled-components'

export const Input = styled.input`
  outline: none;
  height: 40px;
  border: 2px solid var(--grey);
  border-radius: 6px;
  background: transparent;
  padding-left: 10px;
  &:focus {
    border: 2px solid var(--blue);
  }
  transition: border .3s;
`

export const Label = styled.div`
  color: var(--grey);
  font-size: 13px;
  font-weight: 600;
`
export const InputContainer = styled.div`
  display: grid;
  grid-row-gap: 5px;
`