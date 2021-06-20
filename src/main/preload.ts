import { contextBridge, ipcRenderer } from 'electron'
import { IUserCrud } from '@/shared/dataStore/user'
import { IDaysCrud } from '@/shared/dataStore/days'

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

const notifications = {
  notify: (cb: () => void) => {
    ipcRenderer.invoke('show-notification', cb)
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