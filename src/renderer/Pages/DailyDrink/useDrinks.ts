import daysFetchers from '@/renderer/RemoteData/days'
import { useDaysStore } from '@/renderer/Store/days'
import { DateTime } from 'luxon'
import * as React from 'react'

const searchedDate = DateTime.now().toISODate()

const useDrinks = () => {
  const today = useDaysStore(state => state.days.find(day => DateTime.fromJSDate(day.createdAt).toISODate() === searchedDate))
  const addDay = useDaysStore(state => state.addDay)
  const replaceDay = useDaysStore(state => state.replaceDay)
  const [ getDrinks, setDrinks ] = React.useState(() => today ? today.days : [])
  const addDrink = async (drink: {amount: number, name: string}) => {
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
  }

  return {
    addDrink,
    getDrinks
  }
}

export default useDrinks