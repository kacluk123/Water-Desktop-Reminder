import { IDrink } from '@/shared/dataStore/days'
import * as React from 'react'
import * as Styled from './DailyDrinkList.styles'
import { DateTime } from 'luxon'

interface IDailyDrinkList {
  drinks: IDrink[]
}

const DailyDrinkList: React.FC<IDailyDrinkList> = ({ drinks }) => {
  return (
    <Styled.DailyDrinkList>
      <Styled.DailyDrinkListHeader>
        <Styled.DailyDrinkListHeaderItem>
          Drink name
        </Styled.DailyDrinkListHeaderItem>
        <Styled.DailyDrinkListHeaderItem>
          Amount
        </Styled.DailyDrinkListHeaderItem>
        <Styled.DailyDrinkListHeaderItem>
          Time
        </Styled.DailyDrinkListHeaderItem>
      </Styled.DailyDrinkListHeader>
      {drinks.map(drink => {
        return (
          <Styled.DailyDrinkListContainer>
            <Styled.SingleDrinkElement>
              {drink.name}
            </Styled.SingleDrinkElement>
            <Styled.SingleDrinkElement>
              {drink.number}
            </Styled.SingleDrinkElement>
            <Styled.SingleDrinkElement>
              {DateTime.fromJSDate(drink.drinkedAt).toLocaleString(DateTime.TIME_24_SIMPLE)}
            </Styled.SingleDrinkElement>
          </Styled.DailyDrinkListContainer>
        )
      })}
    </Styled.DailyDrinkList>
  )
}

export default DailyDrinkList