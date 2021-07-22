import Button from '@/renderer/Components/Form/Button'
import Input from '@/renderer/Components/Form/Input'
import useOutsideClick from '@/renderer/Utils/Hooks/useOutsideClick'
import * as React from 'react'

import * as Styled from './DailyDrinkForm.styles'

interface IDailyDrinkForm {
  addDrink: (drink: {amount: number, name: string}) => void
  closeForm: () => void
  isDrinkFormOpened: boolean
}

const DailyDrinkForm: React.FC<IDailyDrinkForm> = ({ 
  addDrink,
  closeForm,
  isDrinkFormOpened
}) => {
  const [ amount, setAmount] = React.useState("")
  const [ name, setName] = React.useState("")
  const ref = React.useRef<HTMLDivElement | null>(null)
  useOutsideClick(closeForm, ref)
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
    <Styled.DailyDrinkForm ref={ref}>
      <Input label="Name" value={name} onChange={(e) => {setName(e.currentTarget.value)}} />
      <Input label='Amount'  value={amount} onChange={(e) => {setAmount(e.currentTarget.value)}} />
      <Button onClick={(e) => {
        e.stopPropagation()
        handleAddDrink()
      }}>
        Drink
      </Button>
    </Styled.DailyDrinkForm>
  )
}

export default DailyDrinkForm