import * as React from 'react'
import * as Styled from './Notification.styles'
import Toggle from '@/renderer/Components/Form/Toggle'
import Input from '@/renderer/Components/Form/Input'
import Button from '@/renderer/Components/Form/Button'
import { INotification } from '@/shared/dataStore/notifications'
import { useNotificationStore } from '@/renderer/Store/notifications'

const Notifications: React.FC = () => {
  const notification = useNotificationStore(state => state.notification)
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

  return (
    <Styled.Notification>
      <Styled.NotificationForm>
      <Input label='Amount' 
        onChange={(e) => { 
          setForm((form) => ({
            ...form,
            amount: e.currentTarget.value
          }))
        }} 
        value={form.amount}
      />
      <Input label='Time' 
        onChange={(e) => { 
          setForm((form) => ({
            ...form,
            time: e.currentTarget.value
          }))
        }} 
        value={form.time}
      />
      <Toggle 
        onChange={(e) => {
          setForm((form) => ({
            ...form,
            active: e.target.checked
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