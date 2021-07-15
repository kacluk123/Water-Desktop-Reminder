import styled from 'styled-components'

export const MainInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainInfoHolder = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MainInfoSingleLabel = styled.div`
  display: grid;
  grid-row-gap: 10px;
  text-align: center;
`

export const MainInfoSingleLabelContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 25px;
`

export const MainInfoSingleLabelHeader = styled.div`
  display: grid;
  grid-row-gap: 10px;
  color: var(--grey);
  font-weight: 600;
  font-size: 22px;
`

export const MainInfoSingleLabelDescription = styled.div`
  display: grid;
  grid-row-gap: 10px;
  color: var(--blue);
  font-weight: 400;
  font-size: 17px;
`

export const ButtonContainer = styled.div`
  margin-top: 25px;
  & {
    button {
      width: 157px;
    }
  }
`

export const HumanImageContainer = styled.div`
  width: 400px;
  height: 400px;
  background: var(--blue);
`

export const HumanImageContainer2 = styled.div`
  background: white;
  width: 400px;
  height: 400px;
  position: relative;

`

export const Test1 = styled.div`

  position: absolute;
  content: "";
  width: 400px;
  z-index: 1;
  height: 400px;
  background: red;
  
`