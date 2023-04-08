import styled from "styled-components";


const smallButtonStyle = {
    backgroundImage: `url("https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/vault/button%20small.png")`,
    color: "#fff",
    backgroundSize: "contain",
    fontFamily: "Orbitron",
    fontSize: "16px",
    height: "43px",
    width: "151px",
    margin: "10px",
    padding: 0,
    border: 0,
    outline: "none",
    cursor: "pointer",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "transparent",
};

const SmallButton = styled.button`
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/vault/button%20small.png");
  color: #fff;
  background-size: contain;
  font-family: Orbitron;
  font-size: 16px;
  height: 43px;
  width: 151px;
  padding: 0;
  border: 0;
  outline: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
`

const RightTopDiv = styled.section`
width: max-content;
position: absolute;
right: 0;
top: 0;
`

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
`

type MoneyProps = {
    amount: number,
    currencySign?: string
    bankruptHandler: () => void
    tradeHandler: () => void
}

export const Money = ({currencySign = "$", ...props}: MoneyProps) => {
    return (
        <RightTopDiv>
            <div style={{textAlign: "center", lineHeight: 1, paddingTop: "1rem"}}>
                <AmountText>
                    {props.amount}{currencySign}
                </AmountText>
            </div>
            <ButtonsContainer>
                <SmallButton onClick={props.bankruptHandler}>
                    <span>bankrupt</span>
                </SmallButton>
                <SmallButton onClick={props.tradeHandler}>
                    <span>trade</span>
                </SmallButton>
            </ButtonsContainer>
        </RightTopDiv>
    );
}