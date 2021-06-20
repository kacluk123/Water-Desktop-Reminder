import styled from 'styled-components'

export const Button = styled.button`
  outline: none;
  border: none;
  font-weight: 400;
  padding: 15px;
  background: var(--orange);
  color: var(--white);
  cursor: pointer;
  transition: .3s background;
  border-radius: 2px;

  &:hover {
    background: #ec2a04;
  }
`
