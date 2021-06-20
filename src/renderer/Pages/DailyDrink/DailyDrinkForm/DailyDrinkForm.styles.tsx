import styled from 'styled-components'

export const DailyDrinkForm = styled.div`
  position: absolute;
  background: var(--white);
  padding: 25px;
  border-radius: 8px;
  display: grid;
  grid-row-gap: 15px;
  border: 2px solid var(--grey);
  width: 300px;
  height: 300px;
  animation: mymove 0.4s;
  transform-origin: top right;
  left: -300px;
  top: 40px;
  @keyframes mymove {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`
