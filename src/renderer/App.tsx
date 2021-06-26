import * as React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import * as Styled from './App.styles'
import UserDetails from '@/renderer/Pages/UserDetails'
import MainInfo from '@/renderer/Pages/MainInfo'
import Notifications from '@/renderer/Pages/Notifications'
import DailyDrink from '@/renderer/Pages/DailyDrink'
import Navigation from '@/renderer/Navigation'
import { GlobalStyle } from './global.styles'
import { useUserStore } from '@/renderer/Store/user'
import { DateTime } from 'luxon'
import { useDaysStore } from './Store/days'
import { useNotificationStore } from './Store/notifications'

declare const window: {
  notifications: {
    notify: () => void
    notifyResponse: () => void
  }
};

const App: React.FC = () => {
  const [isLoading, setLoading ] = React.useState(true)
  const getUser = useUserStore(state => state.fetch)
  const getDays = useDaysStore(state => state.fetch)
  const userData = useUserStore(state => state.user)
  const getNotification = useNotificationStore(state => state.fetch)

  React.useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          getUser(),
          getDays(),
          getNotification()
        ])
      } finally {
        setLoading(false)
      }
    })()

    window.notifications.notify()
    window.notifications.notifyResponse({ test: 'test'})
  }, [])
  
  if (isLoading) {
    return null
  }

  return (
    <>
      <GlobalStyle />
      <Router>
        <Styled.App>
        <Navigation />
          <Styled.MainContainer>
            <Switch>
              <Route path="/main-info"> 
                {userData ? <MainInfo /> : <Redirect to="/edit-user" />}
              </Route> 
              <Route path="/edit-user">
                <UserDetails />
              </Route>
              <Route path="/notifications">
                <Notifications />
              </Route>
              <Route path="/daily">
                <DailyDrink />
              </Route>
              <Route path="/">
                <Redirect to="/main-info" />
              </Route> 
            </Switch>
          </Styled.MainContainer>
        </Styled.App>
      </Router>
    </>
  )
}

export default App
