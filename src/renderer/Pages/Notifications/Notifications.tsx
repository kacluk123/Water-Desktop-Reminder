import * as React from 'react'
import * as Styled from './Notification.styles'
import Toggle from '@/renderer/Components/Form/Toggle'
import Input from '@/renderer/Components/Form/Input'
import Button from '@/renderer/Components/Form/Button'

const Notifications: React.FC = () => {
  const [ value, setValue ] = React.useState<boolean>(false)

  return (
    <Styled.Notification>
      <Styled.NotificationForm>
      <Input label='Amount' />
      <Input label='Time' />
      <Toggle 
        onChange={(e) => {
          setValue(e.currentTarget.checked)
        }}
        checked={value}
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