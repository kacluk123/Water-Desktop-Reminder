import { NotificationResponse } from "@/shared/dataStore/notifications"
import create from "zustand"
import notificationsFetchers from "@/renderer/RemoteData/notifications"
import { DateTime } from "luxon";

export interface IStore {
  notification: NotificationResponse | null
  fetch: () => Promise<void>
  addNotification: (day: NotificationResponse) => void
  replaceNotification: (day: NotificationResponse, id: string) => void
}

export const useNotificationStore = create<IStore>(set => ({
  notification: null,
  fetch: async () => {
    let response = await notificationsFetchers.get()
    if (!response) {
      response = await notificationsFetchers.create({ 
        time: 60,
        amount: 200,
        active: true
      })
    }
    set({ notification: response })
  },
  addNotification: (notification: NotificationResponse) => {
    set((state) => {
      return {
        notification: notification
      }
    })
  },
  replaceNotification: (editedNotification: NotificationResponse) => {
    set((state) => {
      return {
        notification: editedNotification
      }
    })
  }
}))