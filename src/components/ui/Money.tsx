import styled from "styled-components";
import {SmallButton} from "./styledComponents";
import {RightMiddleSection} from "./common";
import {useContext} from "react";
import {ButtonClickSoundContext} from "../ButtonClickSoundProvider";

const AmountText = styled.span`
  font-family: Orbitron;
  font-weight: bold;
  font-size: 74px;
  color: white;
  width: 100%
`

const ButtonsContainer = styled.div`
  display: flex;
  text-align: center;
  gap: 1rem;
  margin-top: 1rem;
`

type MoneyProps = {
    amount: number,
    currencySign?: string
    bankruptHandler: () => void
    tradeHandler: () => void
}

export const Money = ({currencySign = "$", ...props}: MoneyProps) => {
    const playButtonSound = useContext(ButtonClickSoundContext);
    return (
        <RightMiddleSection>
            <div style={{textAlign: "center", lineHeight: 1, paddingTop: "1rem"}}>
                <AmountText>
                    {props.amount}{currencySign}
                </AmountText>
            </div>
            <ButtonsContainer>
                <SmallButton onClick={() => playButtonSound(props.bankruptHandler)}>
                    <span>bankrupt</span>
                </SmallButton>
                <SmallButton onClick={() => playButtonSound(props.tradeHandler)}>
                    <span>trade</span>
                </SmallButton>
            </ButtonsContainer>
        </RightMiddleSection>
    );
}