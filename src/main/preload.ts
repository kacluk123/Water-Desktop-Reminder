import { contextBridge, ipcRenderer } from 'electron'
import { IUserCrud } from '@/shared/dataStore/user'
import { IDaysCrud } from '@/shared/dataStore/days'
import { INotificationCrud, NotificationsType } from '@/shared/dataStore/notifications'

const userBridge: IUserCrud = {
  createUser: async (userData) => {
    return ipcRenderer.invoke('create-user', userData)
  },
  getUser: async () => {
    return ipcRenderer.invoke('get-user')
  },
  updateUser: async (id, userData) => {
    return ipcRenderer.invoke('edit-user', id, userData)
  },
}

const daysBridge: IDaysCrud = {
  createDay: async (userData) => {
    return ipcRenderer.invoke('create-day', userData)
  },
  getDays: async () => {
    return ipcRenderer.invoke('get-days')
  },
  updateDay: async (id, userData) => {
    return ipcRenderer.invoke('update-day', id, userData)
  },
}

const notificationBridge: INotificationCrud = {
  createNotification: async (notificationData) => {
    return ipcRenderer.invoke('create-notification', notificationData)
  },
  getNotification: async () => {
    return ipcRenderer.invoke('get-notifications')
  },
  updateNotification: async (id, notificationData) => {
    return ipcRenderer.invoke('update-notification', id, notificationData)
  },
}

const notifications = {
  notify: () => {
    ipcRenderer.send('show-notification')
  },
  notifyResponse: (cb: () => void) => {
    console.log(cb)
    return ipcRenderer.on('notification-reply', (event, result) => {
      if (result === NotificationsType.DRINK) {
        cb()
      }
    })
  }
}

contextBridge.exposeInMainWorld(
  'user',
  userBridge
)

contextBridge.exposeInMainWorld(
  'days',
  daysBridge
)

contextBridge.exposeInMainWorld(
  'notifications',
  notifications
)

contextBridge.exposeInMainWorld(
  'notificationsData',
  notificationBridge
)