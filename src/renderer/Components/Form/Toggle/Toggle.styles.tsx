import styled from "styled-components"

export const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

export const ToggleContainer = styled.label`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-column-gap: 5px;
  cursor: pointer;
  grid-template-columns: max-content max-content;
`

export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked {
    &+ .slider {
      background-color: var(--blue);
    }
  }
  &:focus {
    &+ .slider {
      box-shadow: 0 0 1px var(--blue);
    }
  }
  &:checked {
    &+ .slider:before {
      transform: translateX(26px);
    }
  }
`

export const Slider = styled.span.attrs({
  className: 'slider'
})`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--grey-lite);
  transition: .4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    border-radius: 50%;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: var(--white);
    transition: .4s;
  }
`

export const ToggleLabel = styled.span`
  color: var(--grey-lite);
  font-size: 13px;
  font-weight: 600;
`