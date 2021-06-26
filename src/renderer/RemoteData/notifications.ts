import { INotificationCrud, NotificationPayload } from '@/shared/dataStore/notifications'

declare const window: {
  notificationsData: INotificationCrud
};

class NotificationsFetchers {
  constructor(private readonly fetchers: INotificationCrud) {}
  
  get = async () => {
    const notification = await this.fetchers.getNotification()
    return notification
  }

  edit = async (id: string, payload: NotificationPayload) => {
    return this.fetchers.updateNotification(id, payload)
  }

  create = async (payload: NotificationPayload) => {
    const notification = await this.fetchers.createNotification(payload)
    return notification
  }
}

const notificationsFetchers = new NotificationsFetchers(window.notificationsData)

export default notificationsFetchers