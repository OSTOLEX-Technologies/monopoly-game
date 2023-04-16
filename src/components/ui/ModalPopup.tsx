import {SmallButton} from "./styledComponents";
import styled from "styled-components";
import {Html} from "@react-three/drei";
import {ModalPopupData} from "../../ReactManagers";


const Background = styled.div`
width: 600px;
height: 400px;
background-image: url("https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/vault/horisontal_popup.png");
background-repeat: no-repeat;
background-size: 100% 100%;
margin: auto;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const PopupText = styled.p`
font-family: Orbitron;
font-weight: bold;
font-size: 24px;
color: white;
text-align: center;
margin: 0px 35px;
`;


export function ModalPopup(props: ModalPopupData) {
    return (
        <Html>
            <Background>
                <div
                    style={{
                        height: "100%",
                        padding: "20% 0",
                    }}
                >
                    <PopupText>
                        {props.message}
                    </PopupText>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: "20px",
                        }}
                    >
                        <SmallButton onClick={props.noCallback}>
                            <span style={{ paddingTop: "5px" }}>{props.noText}</span>
                        </SmallButton>
                        <SmallButton onClick={props.yesCallback}>
                            <span style={{ paddingTop: "5px" }}>{props.yesText}</span>
                        </SmallButton>
                    </div>
                </div>
            </Background>
        </Html>
    );
}
