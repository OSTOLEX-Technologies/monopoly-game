import {Board} from "./Board";
import {Animator} from "./Animator";
import {Jail} from "./Jail";
import {AudioListenerContext, JAIL_POSITION_ARRAY, moneyChipsTypes} from "../constants";
import {ChanceDeck} from "./ChanceDeck";
import {TreasuryDeck} from "./TreasuryDeck";
import {ModalPopupProvider} from "./ModalPopupProvider";
import {CellInfoPopupProvider} from "./CellInfoPopupProvider";
import OrbitronText from "./OrbitronText3D";
import {BoardBackground} from "./BoardBackground";
import {Html, OrbitControls} from "@react-three/drei";
import {useLoader} from "@react-three/fiber";
import {AudioLoader, Audio, AudioListener} from "three";
import {useContext, useEffect, useRef, useState} from "react";
import gameplay from "../assets/sounds/Soundtracks/gameplay.mp3";
import {UI} from "./ui/UI";


function GameplaySoundtrack() {
    const listener = useContext(AudioListenerContext);
    const musicPlayer = useRef<Audio>();
    const gameplayTrack = useLoader(AudioLoader, gameplay)

    console.log("LISTENER", listener)
    useEffect(() => {
        if (!musicPlayer.current) return;
        musicPlayer.current!.setBuffer(gameplayTrack);
        musicPlayer.current!.setLoop(true);
        musicPlayer.current!.setVolume(0.05);
        musicPlayer.current!.setPlaybackRate(1);
        musicPlayer.current!.play();
    }, [musicPlayer])

    return (
        // @ts-ignore
        <audio ref={musicPlayer} args={[listener]}/>
    )
}

export function Scene() {
    return (
        <>
            {/*<OrbitControls/>*/}
            <GameplaySoundtrack/>
            <Animator/>
            <Board>
                <OrbitronText text={"OSTOLEX"} position={[-0.7, 0.01, 2.3]} rotation={[Math.PI/2, Math.PI, 0]}/>
                <TreasuryDeck/>
                <Jail position={JAIL_POSITION_ARRAY} scale={[1.5, 1.5, 1.5]}/>
                <ChanceDeck/>
            </Board>
            {/*<UI/>*/}
            <BoardBackground/>
            <ModalPopupProvider/>
            <CellInfoPopupProvider/>
            <ambientLight intensity={1} position={[0, 10, 0]}/>
            <directionalLight intensity={0.3} position={[0, 10, 0]}/>
        </>
    )
}
