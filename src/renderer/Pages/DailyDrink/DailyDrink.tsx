import * as React from 'react'
import { DateTime } from 'luxon'

import { Human } from '@/renderer/Components/Icons/human'
import * as Styled from './DailyDrink.styles'
import DailyDrinkForm from './DailyDrinkForm'
import DailyDrinkList from './DailyDrinkList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons'
import { useUserStore } from '@/renderer/Store/user'
import useDrinks from './useDrinks'

const DailyDrink = () => {
  const neededWater = useUserStore(state => state.user?.neededWater)
  const { getDrinks, addDrink } = useDrinks()
  const [ isDrinkFormOpened, setDrinkFormOpened ] = React.useState(false)

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