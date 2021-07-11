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
import { NotificationProvider } from './useNotification'
import Content from './Content'

const App: React.FC = () => {
  const [isLoading, setLoading ] = React.useState(true)
  const getUser = useUserStore(state => state.fetch)
  const getDays = useDaysStore(state => state.fetch)
  const getNotification = useNotificationStore(state => state.fetch)

  React.useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          getUser(),
          getDays(),
          getNotification()
        ])
      } catch(err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])
  
  if (isLoading) {
    return null
  }
  return (
    <NotificationProvider>
      <Content />
    </NotificationProvider>
  )
}

export default App
