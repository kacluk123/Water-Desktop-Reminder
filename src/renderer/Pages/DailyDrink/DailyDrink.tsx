import * as React from 'react'
import { DateTime } from 'luxon'

import { Human } from '@/renderer/Components/Icons/human'
import { useDaysStore } from '@/renderer/Store/days'
import * as Styled from './DailyDrink.styles'
import Input from '@/renderer/Components/Form/Input'
import DailyDrinkForm from './DailyDrinkForm'
import DailyDrinkList from './DailyDrinkList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import daysFetchers from '@/renderer/RemoteData/days'
import { useUserStore } from '@/renderer/Store/user'
const searchedDate = DateTime.now().toISODate()

const DailyDrink = () => {
  const today = useDaysStore(state => state.days.find(day => DateTime.fromJSDate(day.createdAt).toISODate() === searchedDate))
  const addDay = useDaysStore(state => state.addDay)
  const neededWater = useUserStore(state => state.user?.neededWater)
  const replaceDay = useDaysStore(state => state.replaceDay)
  const [ getDrinks, setDrinks ] = React.useState(() => today ? today.days : [])
  const [ isDrinkFormOpened, setDrinkFormOpened ] = React.useState(false)
  
  const addDrink = React.useCallback(async (drink: {amount: number, name: string}) => {
    const newDrinks = [
      {
        name: drink.name,
        number: drink.amount,
        drinkedAt: DateTime.now().toUTC().toJSDate()
      },
      ...getDrinks
    ]
    setDrinks(newDrinks)
    
    if (today?.days && today.days.length > 0) {
      await daysFetchers.edit(today._id, { days: newDrinks })
      replaceDay({
        createdAt: today.createdAt,
        _id: today._id,
        days: newDrinks
      }, today._id)
    } else {
      const day = await daysFetchers.create({ days: newDrinks })
      addDay(day)
    }
  }, [])

  const allDrinkedWater = React.useMemo(() => {
    return getDrinks.reduce<number>((prev, curr) => (prev + curr.number), 0)
  }, [getDrinks.length])

  const drinkedWaterInPercent = React.useMemo(() => {
    return allDrinkedWater / (neededWater ?? 0) * 100
  }, [getDrinks.length])

  return (
    <Styled.DailyDrink>
      <Styled.DailyDrinkLeft>
        <DailyDrinkList drinks={getDrinks}/>
      </Styled.DailyDrinkLeft>
      <Styled.DailyDrinkRight>
        <Styled.HumanContainer>
          <Styled.DailyDrinkIcon onClick={(e) => { 
            setDrinkFormOpened(true)}
          }>
            <FontAwesomeIcon
              icon={faCoffee}
              />
              {isDrinkFormOpened ? (
                <DailyDrinkForm addDrink={addDrink} closeForm={() => { 
                  setDrinkFormOpened(false)}} 
                />
              ) : null}
          </Styled.DailyDrinkIcon>
          <Human percent={100 - drinkedWaterInPercent} />
          <Styled.DailyDrinkInfo>
            {allDrinkedWater} / {neededWater} milliliters
          </Styled.DailyDrinkInfo>
        </Styled.HumanContainer>
      </Styled.DailyDrinkRight>
    </Styled.DailyDrink>
  )
}

export default DailyDrink