import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Navigation = styled.nav`
  width: 80px;
  padding: 25px 0;
  display: grid;
  grid-row-gap: 35px;
  grid-auto-rows: max-content;
  height: 100%;
  background: var(--grey);
  position: relative;
  &::before {
    transition: transform .3s;
    transform: ${(props: { currentRouteIndex: number }) => `translateY(${props.currentRouteIndex * 65}px)`};
    content: "";
    height: 50px;
    background: var(--blue);
    width: 3px;
    top: 15px;
    position: absolute;
  }
`

export const SingleLink = styled.div`
  display: grid;
  justify-content: center;
  grid-row-gap: 5px;
  grid-template-columns: 100%;
  width: 100%;
`

export const IconContainer = styled.div`
  justify-self: center;
`

export const Link = styled(NavLink)`
  color: var(--white);
  text-decoration: none;
  font-size: 12px;
  text-align: center;
  transition: .3s ease-out;
`