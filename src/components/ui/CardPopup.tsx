import styled from "styled-components";
import {CardType} from "../../constants";
import {Html} from "@react-three/drei";

const Background = styled.div`
  width: 750px;
  height: 500px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: auto;
  clip-path: polygon(5% 0%, 95% 0%, 100% 7.25%, 100% 92.25%, 95% 100%, 5% 100%, 0% 92.25%, 0% 7.25%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/*background-color для Chance: #6766FF, для Tresury: #BCC4FF*/

const CloseButton = styled.button`
  padding: 0;
  border: 0;
  height: 36px;
  width: 36px;
  border-radius: 0;
  display: block;
  background-color: transparent;
  background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/vault/close.png");
  background-repeat: no-repeat;
  background-size: contain;
`;

const Heading = styled.div`
  font-family: "Noize Sport Free Vertion";
  font-size: 48px;
  color: white;
  text-align: center;
`;

const Text = styled.div`
  font-family: "Orbitron";
  font-size: 24px;
  color: white;
  text-align: center;
  margin: 30px 40px;
`;

interface CardPopupProps {
    type: CardType,
    description: string,
    closeCallback: () => void,
}

export function CardPopup(props: CardPopupProps) {

    return (
        <Html position={[0, 0, 0]}>
            <Background style={{
                display: "auto",
                backgroundColor: props.type === CardType.Chance ? "#6766FF" : "#BCC4FF",
            }}>
                <div
                    style={{
                        height: "100%",
                        padding: "5% 0",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            margin: "0px 40px",
                        }}
                    >
                        <CloseButton onClick={props.closeCallback}/>
                    </div>
                    <Heading>{props.type == CardType.Chance ? "Chance": "Treasury"}</Heading>
                    <Text>
                        {props.description}
                    </Text>
                </div>
            </Background>
        </Html>
    );
}