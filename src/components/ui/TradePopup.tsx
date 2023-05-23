import styled from "styled-components";
import {useState} from "react";
import {Html} from "@react-three/drei";

const Background = styled.div`
  background-image: url('${import.meta.env.BASE_URL + "vault/horisontal_popup.png"}');
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  background-size: 100% 100%;
  width: max-content;
  padding: 3rem 5rem;
  justify-content: center;
  align-items: center;
  font-family: Orbitron;
  position: absolute;
  top: 5vh;
  right: 50%;
  transform: translate(50%, -50%);
`;

const BigButton = styled.button`
  background-image: url('${import.meta.env.BASE_URL + "vault/button big.svg"}');
  color: #fff;
  font-family: Orbitron;
  font-size: 32px;
  width: 100%;
  height: 100%;
  padding: 15px;
  border: 0;
  outline: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  font-weight: bold;
  background-size: contain;
  text-shadow: #fff 1px 0px 10px;
`;

const CloseButton = styled.button`
  padding: 0;
  border: 0;
  height: 36px;
  width: 36px;
  background-color: transparent;
  background-image: url('${import.meta.env.BASE_URL + "vault/close.png"}');
  outline: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  background-size: contain;
`;

const Checkbox = styled.input`
  padding: 0;
  border: 0;
  height: 86px;
  width: 86px;
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  background-color: transparent;
  background: url('${import.meta.env.BASE_URL + "vault/checkbox.png"}');
  background-size: contain;
  display: grid;
  place-content: center;
  transform: translateY(-0.075em);

  &:hover {
    cursor: pointer;
  }

  &::before {
    background: url('${import.meta.env.BASE_URL + "vault/checkmark.png"}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    content: "";
    width: 2em;
    height: 2em;
    transform: scale(0);
  }

  &:checked::before {
    transform: scale(1);
  }
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10%;
`;

const SideButton = styled.button`
  padding: 0;
  border: 0;
  height: 42px;
  width: 42px;
  background-color: transparent;
`;

const SliderValue = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
`;

const sliderStyle = {
    appearance: "none",
    width: "100%",
    background: "transparent",
    outline: "none",
    border: "none",
    backgroundImage: `url('${import.meta.env.BASE_URL + "vault/slider path.png"}'`,
    backgroundPosition: "center",
    backgroundSize: "110% 100%",
    boxShadow: "none",
};

const sliderThumbStyle = {
    // appearance: "none",
    width: "20px",
    height: "20px",
    background: `url('${import.meta.env.BASE_URL + "vault/slider handle.png"}') no-repeat center`,
    cursor: "pointer",
};

const PropertyList = styled.div`
  height: 424px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    background: transparent;
    width: 6px;
  }

  scrollbar-color: #0806aa transparent;
  scrollbar-width: thin;

  &::-webkit-scrollbar-thumb {
    background: #0806aa;
    border-radius: 3rem;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Line = styled.div`
  font-family: Orbitron;
  font-size: 24px;
  color: #fff;
  display: flex;
  row-gap: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #0806aa;

  &:last-child {
    border-bottom: none;
  }
`;

const PropertyName = styled.label`
  word-wrap: break-word;
`;

const PropertyPrice = styled.label`
  word-wrap: break-word;
`;

const PropertyNameContainer = styled.div`
  width: 17rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type PropertyRowProps = {
    propertyName: string;
    propertyPrice: number;
    onSelect?: () => void;
}

const PropertyRow = ({propertyName, propertyPrice, onSelect}: PropertyRowProps) => {
    const id = propertyName + Math.random();
    return (
        <Line>
            <PropertyNameContainer>
                <PropertyName htmlFor={id}>{propertyName}</PropertyName>
                <PropertyPrice htmlFor={id}>{propertyPrice}$</PropertyPrice>
            </PropertyNameContainer>
            <Checkbox type="checkbox" id={id} onClick={onSelect}/>
        </Line>
    );
};
//   <img
//     src="https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/main/public/vault/checkbox.png"
//     height="100%"
//     width="100%"
//     //checkmark: https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/main/public/vault/checkmark.png
//   />
// </Checkbox>

const StyledText = styled.div`
  font-family: Orbitron;
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 46px;
`;

const Label = styled.label`
  color: #fff;
`;

const properties = [
    {propertyname: "Ave 1", propertyprice: 1000},
    {propertyname: "Ave 2", propertyprice: 2000},
    {propertyname: "Ave 3", propertyprice: 9000},
    {
        propertyname: "Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3",
        propertyprice: 9000,
    },
    {
        propertyname: "Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3",
        propertyprice: 9000,
    },
    {
        propertyname: "Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3Ave 3",
        propertyprice: 9000,
    },
];


export type Property = {
    name: string;
    price: number;
}

export type Opponent = {
    name: string;
    moneyAmount: number;
    properties: Array<Property>;
}


type TradePopupProps = {
    type?: "outcoming" | "incoming";
    userMoneyAmount?: number;
    userProperties?: Array<Property>;
    opponents?: Array<Opponent>;
    onClose?: () => void;
    onTrade?: (userProperties: Array<Property>,
               userMoney: number,
               opponentName: string,
               opponentMoneyAmount: number,
               opponentProperties: Array<Property>) => void;
    onAccept?: () => void;
    onDecline?: () => void;
};


export function TradePopup({
                               onClose = () => {
                               },
                               onTrade = () => {
                               },
                               onAccept = () => {
                               },
                               onDecline = () => {
                               },
                               userProperties = [],
                               type = "outcoming",
                               userMoneyAmount = 0,
                               opponents = []
                           }: TradePopupProps) {
    const [userMoneyAmountState, setUserMoneyAmountState] = useState(0);
    const [opponentMoneyAmount, setOpponentMoneyAmount] = useState(0);
    const [selectedOpponentIndex, setSelectedOpponentIndex] = useState(0);
    const [selectedUserProperties, setSelectedUserProperties] = useState<Array<Property>>([]);
    const [selectedOpponentProperties, setSelectedOpponentProperties] = useState<Array<Property>>([]);
    const selectedOpponent = opponents[selectedOpponentIndex];
    const opponentProperties = selectedOpponent.properties || [];

    const updateSelectedUserProperties = (index: number) => {
        const property = userProperties[index];
        const isSelected = selectedUserProperties.includes(property);
        if (isSelected) {
            setSelectedUserProperties(selectedUserProperties.filter((p) => p !== property));
        } else {
            setSelectedUserProperties([...selectedUserProperties, property]);
        }
    }

    const updateSelectedOpponentProperties = (index: number) => {
        const property = opponentProperties[index];
        const isSelected = selectedOpponentProperties.includes(property);
        if (isSelected) {
            setSelectedOpponentProperties(selectedOpponentProperties.filter((p) => p !== property));
        } else {
            setSelectedOpponentProperties([...selectedOpponentProperties, property]);
        }
    }

    return (
        <Html>
            <Background>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Row>
                            <CloseButton onClick={onClose}/>
                        </Row>
                        <div style={{display: "flex"}}>
                            <div>
                                <StyledText>You</StyledText>
                                {type === "outcoming" && (
                                    <SliderContainer>
                                        <Label htmlFor="priceRangeUser">0</Label>
                                        <input
                                            id="priceRangeUser"
                                            type="range"
                                            min="0"
                                            max={userMoneyAmount}
                                            step="1"
                                            // @ts-ignore
                                            style={sliderStyle}
                                            // thumbStyle={sliderThumbStyle}
                                            onChange={(e) =>
                                                setUserMoneyAmountState(parseInt(e.target.value))
                                            }
                                            value={userMoneyAmountState}
                                        />
                                        <Label htmlFor="priceRangeUser">${userMoneyAmount}</Label>
                                    </SliderContainer>
                                )}
                                <SliderValue>
                                    <span>{userMoneyAmountState}$</span>
                                </SliderValue>
                                <PropertyList>
                                    {userProperties.map((property, index) =>
                                        <PropertyRow propertyName={property.name} propertyPrice={property.price}
                                                     key={index} onSelect={() => updateSelectedUserProperties(index)}/>
                                    )}
                                </PropertyList>
                            </div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {type === "outcoming" && (
                                        <SideButton onClick={
                                            () => {
                                                if (selectedOpponentIndex > 0) {
                                                    setSelectedOpponentIndex(selectedOpponentIndex - 1);
                                                } else {
                                                    setSelectedOpponentIndex(opponents.length - 1);
                                                }
                                                setOpponentMoneyAmount(0);
                                            }
                                        }>
                                            <img
                                                src={import.meta.env.BASE_URL + "vault/left button.png"}
                                                height="80%"
                                                width="80%"
                                            />
                                        </SideButton>)}
                                    <StyledText>{selectedOpponent.name}</StyledText>
                                    {type === "outcoming" && (
                                        <SideButton onClick={
                                            () => {
                                                if (selectedOpponentIndex < opponents.length - 1) {
                                                    setSelectedOpponentIndex(selectedOpponentIndex + 1);
                                                } else {
                                                    setSelectedOpponentIndex(0);
                                                }
                                                setOpponentMoneyAmount(0);
                                            }
                                        }>
                                            <img
                                                src={import.meta.env.BASE_URL + "vault/right button.png"}
                                                height="80%"
                                                width="80%"
                                            />
                                        </SideButton>)}
                                </div>
                                {type === "outcoming" && (
                                    <SliderContainer>
                                        <Label htmlFor="priceRangeOpponent">0</Label>
                                        <input
                                            id="priceRangeOpponent"
                                            type="range"
                                            min="0"
                                            max={selectedOpponent.moneyAmount}
                                            step="1"
                                            // @ts-ignore
                                            style={sliderStyle}
                                            // thumbStyle={sliderThumbStyle}
                                            onChange={(e) =>
                                                setOpponentMoneyAmount(parseInt(e.target.value))
                                            }
                                            value={opponentMoneyAmount}
                                        />
                                        <Label htmlFor="priceRangeOpponent">${selectedOpponent.moneyAmount}</Label>
                                    </SliderContainer>
                                )}
                                <SliderValue>
                                    <span>{opponentMoneyAmount}$</span>
                                </SliderValue>
                                <PropertyList>
                                    {opponentProperties.map((property, index) =>
                                        <PropertyRow propertyName={property.name} propertyPrice={property.price}
                                                     key={index} onSelect={() => updateSelectedOpponentProperties(index)}/>
                                    )}
                                </PropertyList>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        textAlign: "center",
                        paddingBottom: "1rem",
                        paddingTop: "1rem",
                        display: "flex",
                    }}
                >
                    {type === "outcoming" && (
                        <BigButton onClick={() => onTrade(selectedUserProperties,
                            userMoneyAmountState,
                            selectedOpponent.name,
                            opponentMoneyAmount,
                            selectedOpponentProperties)}>
                            <span>Trade</span>
                        </BigButton>
                    )}
                    {type === "incoming" && (
                        <>
                            <BigButton onClick={onAccept}>
                                <span>Accept</span>
                            </BigButton>
                            <BigButton onClick={onDecline}>
                                <span>Decline</span>
                            </BigButton>
                        </>
                    )}
                </div>
            </Background>
        </Html>
    );
}

