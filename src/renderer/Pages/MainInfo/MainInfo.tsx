import { useUserStore } from '@/renderer/Store/user'
import * as React from 'react'
import * as Styled from './MainInfo.styles'
import { Human } from '@/renderer/Components/Icons/human'

const MainInfo: React.FC = () => {
  const user = useUserStore(state => state.user)

  const [percent, setPercent] = React.useState(0)

  
  return (
    <Styled.MainInfo>
      <button onClick={() => {
        setPercent(percent => percent + 50)
      }}>
        add
      </button>
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
      {/* <Styled.HumanImageContainer>
      </Styled.HumanImageContainer> */}

        <Human percent={100 - ((percent / 2200) * 100)} />

    </Styled.MainInfo>
  )
}

export default MainInfo