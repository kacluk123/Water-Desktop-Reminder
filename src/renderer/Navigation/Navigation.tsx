import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './Navigation.styles'
import { useRouteMatch } from 'react-router-dom'

const routes = [
  {
    to: '/daily',
    label: 'Daily',
    icon: (
      <FontAwesomeIcon icon={faUser} />
    )
  },
  {
    to: '/main-info',
    label: 'User details',
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
]

const Navigation: React.FC = () => {
  const [currentRouteIndex, setCurrentRouteIndex] = React.useState<number>(0)

  React.useEffect(() => {
    const setInitialRoute = () => {
      const [ routeName ] = window.location.href.split('/').reverse()
      const currentRouteIndex = routes.findIndex(route => route.to === `/${routeName}`)
      setCurrentRouteIndex(currentRouteIndex)
    }
    setInitialRoute()
  }, [])  

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