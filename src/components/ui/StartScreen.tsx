import styled from "styled-components";
import {useContext} from "react";
import {ButtonClickSoundContext} from "../ButtonClickSoundProvider";

const StartScreenContainer = styled.div`
height: 100vh;
width: 100vw;
background-color: #000;
display: flex;
justify-content: center;
align-items: center;
`

const StartScreenButton = styled.button`
font-family: Orbitron;
font-size: 50px;
`


type StartScreenProps = {
    callback: () => void;
}

export function StartScreen(props: StartScreenProps) {
    const playButtonSound = useContext(ButtonClickSoundContext);
    const onClick = () => {
        playButtonSound();
        props.callback();
    }
    return (
        <StartScreenContainer>
            <StartScreenButton onClick={onClick}>
                Start
            </StartScreenButton>
        </StartScreenContainer>
    )
}