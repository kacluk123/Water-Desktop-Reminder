import styled from 'styled-components'

export const DailyDrinkListContainer = styled.div`
  grid-template-columns: repeat(3, 130px);
  display: grid;
  grid-column-gap: 40px;
  padding-bottom: 10px;
  height: 27px;
  animation: mymove .3s;
  border-bottom: 1px solid var(--grey-lite);
  @keyframes mymove {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      height: 27px;
      opacity: 1;
    }
  }
`

export const DailyDrinkListHeader= styled.div`
  grid-template-columns: repeat(3, 130px);
  display: grid;
  grid-column-gap: 40px;
`

export const DailyDrinkListHeaderItem = styled.div`
  color: var(--grey-lite);
  font-weight: 700;
`

export const DailyDrinkList = styled.div`
  display: grid;
  grid-row-gap: 30px;
`

export const SingleDrinkElement = styled.div`
`