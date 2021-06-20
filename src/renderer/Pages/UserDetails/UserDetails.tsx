import * as React from 'react'
import * as Styled from './UserDetails.styles'

import Input from '@/renderer/Components/Form/Input'
import Button from '@/renderer/Components/Form/Button'
import userFetchers from '@/renderer/RemoteData/user'
import { useUserStore } from '@/renderer/Store/user'

const UserDetails: React.FC = () => {
  const [weight, setWeight] = React.useState("")
  const [name, setName] = React.useState("")
  const setUserData = useUserStore(state => state.setUserData)
  const handleSubmit = async () => {
    const data = await userFetchers.create({
      weight: Number(weight),
      name
    })
    setUserData(data)
  }
  
  return (
    <Styled.UserDetails>
      <Styled.UserDetailsFormContainer onSubmit={handleSubmit}>
        <Input label='Weight' placeholder='Your weight in kilograms' type='number' value={weight} onChange={(e) => { 
          setWeight((e.currentTarget.value))}
        }/>
        <Input label='Name' placeholder='Your name' value={name}  onChange={(e) => { setName(e.currentTarget.value)}}/>
        <Button>
          Submit
        </Button>
      </Styled.UserDetailsFormContainer>
    </Styled.UserDetails>
  )
}

export default UserDetails