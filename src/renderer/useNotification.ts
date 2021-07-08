import * as React from 'react'
import useDrinks from './Pages/DailyDrink/useDrinks';
import { useNotificationStore } from './Store/notifications';

declare const window: {
  notifications: {
    notify: () => void
    notifyResponse: (cb: () => void) => void
  }
};

const useNotification = () => {
  const notificationInfo = useNotificationStore(state => state.notification)
  const { getDrinks, addDrink } = useDrinks()
  
  const sendNotification = () => {
    window.notifications.notify()
  }

  const startNotificationInterval = (time: number) => {
    sendNotification()
    setInterval(() => {
      sendNotification()
    }, time * 60 * 60)
  }

  const handleNotificationResponse = (amount: number) => {
    window.notifications.notifyResponse(() => {
      addDrink({
        amount: amount,
        name: 'Water'
      })
    })
  }

  return {
    startNotificationInterval,
    handleNotificationResponse,
  }
}

export default useNotification