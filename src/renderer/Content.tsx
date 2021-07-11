import * as React from 'react'
import * as Styled from './App.styles'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useUserStore } from './Store/user'
import { GlobalStyle } from './global.styles'
import UserDetails from '@/renderer/Pages/UserDetails'
import MainInfo from '@/renderer/Pages/MainInfo'
import Notifications from '@/renderer/Pages/Notifications'
import DailyDrink from '@/renderer/Pages/DailyDrink'
import Navigation from '@/renderer/Navigation'
import { useNotificationStore } from './Store/notifications'
import { useNotification } from './useNotification'

const Content = () => {
  const userData = useUserStore(state => state.user)
  const notification = useNotificationStore(state => state.notification)
  const { startNotificationInterval, handleNotificationResponse } = useNotification()

  React.useEffect(() => {
    startNotificationInterval()
    handleNotificationResponse()
  }, [])

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

export default Content