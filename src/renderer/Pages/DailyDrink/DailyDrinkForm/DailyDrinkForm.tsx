import Button from '@/renderer/Components/Form/Button'
import Input from '@/renderer/Components/Form/Input'
import * as React from 'react'

import * as Styled from './DailyDrinkForm.styles'

interface IDailyDrinkForm {
  addDrink: (drink: {amount: number, name: string}) => void
  closeForm: () => void
}

const DailyDrinkForm: React.FC<IDailyDrinkForm> = ({ 
  addDrink,
  closeForm
}) => {
  const [ amount, setAmount] = React.useState("")
  const [ name, setName] = React.useState("")

  const handleAddDrink = () => {
    addDrink({
      amount: Number(amount),
      name
    })
    setName("")
    setAmount("")
    closeForm()
  }

  return (
    <Styled.DailyDrinkForm>
      <Input label="Name" value={name} onChange={(e) => {setName(e.currentTarget.value)}} />
      <Input label='Amount'  value={amount} onChange={(e) => {setAmount(e.currentTarget.value)}} />
      <Button onClick={handleAddDrink}>
        Drink
      </Button>
    </Styled.DailyDrinkForm>
  )
}

export default DailyDrinkForm