import styled from 'styled-components'

export const DailyDrink = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  background: var(--white);
`

export const DailyDrinkLeft = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DailyDrinkRight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const DailyDrinkIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  cursor: pointer;
  height: 45px;
  border-radius: 50%;
  position: absolute;
  right: 80px;
  border: 1px solid var(--grey);
`

export const HumanContainer = styled.div`
  position: relative;
`

export const DailyDrinkInfo = styled.div`
  color: var(--grey-lite);
  text-align: center;
  margin-top: 15px;
`