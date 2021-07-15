import { useUserStore } from '@/renderer/Store/user'
import * as React from 'react'
import * as Styled from './MainInfo.styles'
import { Human } from '@/renderer/Components/Icons/human'
import Button from '@/renderer/Components/Form/Button'
import { Link } from 'react-router-dom'

const MainInfo: React.FC = () => {
  const user = useUserStore(state => state.user)

  const [percent, setPercent] = React.useState(0)

  
  return (
    <Styled.MainInfoHolder>
      <Styled.MainInfo>
        <Styled.MainInfoSingleLabelContainer>
          <Styled.MainInfoSingleLabel>
            <Styled.MainInfoSingleLabelHeader>
              Name
            </Styled.MainInfoSingleLabelHeader>
            <Styled.MainInfoSingleLabelDescription>
              {user?.name}
            </Styled.MainInfoSingleLabelDescription>
          </Styled.MainInfoSingleLabel>
          <Styled.MainInfoSingleLabel>
            <Styled.MainInfoSingleLabelHeader>
              Weight
            </Styled.MainInfoSingleLabelHeader>
            <Styled.MainInfoSingleLabelDescription>
              {user?.weight} kg
            </Styled.MainInfoSingleLabelDescription>
          </Styled.MainInfoSingleLabel>
        </Styled.MainInfoSingleLabelContainer>
      </Styled.MainInfo>
      <Styled.ButtonContainer>
        <Link to='/edit-user'>
          <Button>
            Edit
          </Button>
        </Link>
      </Styled.ButtonContainer>
    </Styled.MainInfoHolder>
  )
}

export default MainInfo