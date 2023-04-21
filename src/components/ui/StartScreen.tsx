import styled from "styled-components";

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
    return (
        <StartScreenContainer>
            <StartScreenButton onClick={props.callback}>
                Start
            </StartScreenButton>
        </StartScreenContainer>
    )
}