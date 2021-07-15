import * as React from 'react'
import * as Styled from './UserDetails.styles'

import Input from '@/renderer/Components/Form/Input'
import Button from '@/renderer/Components/Form/Button'
import userFetchers, { User } from '@/renderer/RemoteData/user'
import { useUserStore } from '@/renderer/Store/user'
import { useHistory } from 'react-router-dom'

const UserDetails: React.FC = () => {
  const userData = useUserStore(state => state.user)
  const [weight, setWeight] = React.useState(userData?.weight || "")
  const [name, setName] = React.useState(userData?.name || "")
  const { push } = useHistory()
  const setUserData = useUserStore(state => state.setUserData)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userData) {
      const data = await userFetchers.create({
        weight: Number(weight),
        name
      })
      setUserData(data)
      push('/daily')
    } else {
      const data = await userFetchers.edit(userData.id, {
        weight: Number(weight),
        name
      })
      setUserData(new User({
        weight: Number(weight),
        name: name,
        _id: userData.id,
        createdAt: userData.createdAt
      }))
      push('/main-info')
    }
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