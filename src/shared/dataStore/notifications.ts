export interface INotification {
  amount: number
  time: number
  active: boolean
}

export interface NotificationPayload {
  amount: number
  time: number
  active: boolean
}

export interface NotificationResponse {
  _id: string
  amount: number
  time: number
  active: boolean
}

export interface INotificationCrud {
  createNotification: (payload: NotificationPayload) => Promise<NotificationResponse>
  getNotification: () => Promise<NotificationResponse>
  updateNotification: (id: string, payload: NotificationPayload) => Promise<NotificationResponse>
}

export enum NotificationsType {
  SKIP = 'Skip',
  DRINK = 'Drink'
}