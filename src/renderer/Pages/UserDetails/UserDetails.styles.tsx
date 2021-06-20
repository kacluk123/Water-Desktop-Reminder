import styled from 'styled-components'

export const UserDetails = styled.div`
  width: 100%;
  height: calc(100% - 45px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const UserDetailsFormContainer = styled.form`
  display: grid;
  grid-template-rows: max-content max-content;
  grid-row-gap: 20px;
`