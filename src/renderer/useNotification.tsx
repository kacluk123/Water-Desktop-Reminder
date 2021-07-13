import * as React from 'react'
import useDrinks from './Pages/DailyDrink/useDrinks';
import { useNotificationStore } from './Store/notifications';


declare const window: {
  notifications: {
    notify: () => void
    notifyResponse: (cb: () => void) => void
  }
} & Window

const NotificationContext = React.createContext({ } as {
  initializeNotifications: () => void
  clearNotificationInterval: () => void
})

const NotificationProvider: React.FC = ({children}) => {
  const notificationInfo = useNotificationStore(state => state.notification)
  const { getDrinks, addDrink } = useDrinks()
  const notificationInterval = React.useRef<number>()
  
  const initializeNotifications = () => {
    clearNotificationInterval()
    startNotificationInterval()
    handleNotificationResponse()
  }
  
  const sendNotification = () => {
    window.notifications.notify()
  }

  const startNotificationInterval = () => {
    if (notificationInfo) {
      sendNotification()
      notificationInterval.current = window.setInterval(sendNotification, notificationInfo.time * 60 * 60)
    }
  }

  const handleNotificationResponse = () => {
    if (notificationInfo) {
      window.notifications.notifyResponse(() => {
        addDrink({
          amount: notificationInfo?.amount,
          name: 'Water'
        })
      })
    }
  }

  const clearNotificationInterval = () => {
    window.clearInterval(notificationInterval.current)
  }

  return (
    <NotificationContext.Provider
      value={{
        initializeNotifications,
        clearNotificationInterval
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

function useNotification() {
  const context = React.useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {
  NotificationProvider,
  useNotification
}