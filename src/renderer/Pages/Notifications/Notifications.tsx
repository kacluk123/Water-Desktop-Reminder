import * as React from 'react'
import cogoToast from 'cogo-toast';

import * as Styled from './Notification.styles'
import Toggle from '@/renderer/Components/Form/Toggle'
import Input from '@/renderer/Components/Form/Input'
import Button from '@/renderer/Components/Form/Button'
import { INotification } from '@/shared/dataStore/notifications'
import { useNotificationStore } from '@/renderer/Store/notifications'
import notificationsFetchers from '@/renderer/RemoteData/notifications'
import { useNotification } from '@/renderer/useNotification'

const Notifications: React.FC = () => {
  const notification = useNotificationStore(state => state.notification)
  const replaceNotificaion = useNotificationStore(state => state.replaceNotification)
  const { initializeNotifications, clearNotificationInterval } = useNotification()
  const [ form, setForm ] = React.useState<{
    active: boolean,
    amount: string,
    time: string
  }>(() => notification ? {
    active: notification.active,
    amount: notification.amount.toString(),
    time: notification.time.toString(),
  } : {
    active: true,
    amount: "0",
    time: "0",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (notification) {
      await notificationsFetchers.edit(notification._id, {
        ...form,
        amount: Number(form.amount),
        time: Number(form.amount),
      })
      replaceNotificaion({
        amount: Number(form.amount),
        time: Number(form.amount),
        active: form.active,
        _id: notification._id
      }, notification._id)
      if (form.active) {
        initializeNotifications()
      } else {
        clearNotificationInterval()
      }
      await cogoToast.success('Notification data saved!')
    }
  }

  return (
    <Styled.Notification>
      <Styled.NotificationForm onSubmit={handleSubmit}>
      <Input label='Amount of water per notification' 
        onChange={(e) => { 
          const value = e.currentTarget.value
          setForm((form) => {
            return {
              ...form,
              amount: value
            }
          })
        }} 
        value={form.amount}
      />
      <Input label='Time in minutes' 
        onChange={(e) => { 
          const value = e.currentTarget.value
          setForm((form) => ({
            ...form,
            time: value
          }))
        }} 
        value={form.time}
      />
      <Toggle 
        onChange={(e) => {
          const value = e.target.checked
          setForm((form) => ({
            ...form,
            active: value
          }))
        }}
        checked={form.active}
        label='Active'
      />
      <Button>
        Submit
      </Button>
      </Styled.NotificationForm>
    </Styled.Notification>
  )
}

export default Notifications