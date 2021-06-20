import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './Navigation.styles'

const routes = [
  {
    to: '/main-info',
    label: 'User details',
    icon: (
      <FontAwesomeIcon icon={faUser} />
    )
  },
  {
    to: '/test',
    label: 'Test',
    icon: (
      <FontAwesomeIcon icon={faUser} />
    )
  },
  {
    to: '/notifications',
    label: 'Notifications',
    icon: (
      <FontAwesomeIcon icon={faBell} />
    )
  },
  {
    to: '/daily',
    label: 'Daily',
    icon: (
      <FontAwesomeIcon icon={faUser} />
    )
  },
]

const Navigation: React.FC = () => {
  const [currentRouteIndex, setCurrentRouteIndex] = React.useState<number>(0)

  return (
    <Styled.Navigation currentRouteIndex={currentRouteIndex}>
      {routes.map((link, index) => {
        return (
          <Styled.Link 
            to={link.to}
            key={link.label}  
            activeStyle={{
              color: 'var(--blue)'
            }}
            onClick={() => {
              setCurrentRouteIndex(index)
            }}
          >
            <Styled.SingleLink>
              <Styled.IconContainer>
                {link.icon}
              </Styled.IconContainer>
              {link.label}
            </Styled.SingleLink>
          </Styled.Link>
        )
      })}
    </Styled.Navigation>
  )
}

export default Navigation