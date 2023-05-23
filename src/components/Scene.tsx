import React from "react";
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
import {soundSettings} from "../viewGlobals";
import {useMusicVolume} from "../hooks";
import {TradePopup} from "./ui/TradePopup";


function GameplaySoundtrack() {
    const listener = useContext(AudioListenerContext);
    const musicPlayer = useRef<Audio>();
    const gameplayTrack = useLoader(AudioLoader, gameplay)
    const musicK = useMusicVolume();

    useEffect(() => {
        if (!musicPlayer.current) return;
        musicPlayer.current!.setBuffer(gameplayTrack);
        musicPlayer.current!.setLoop(true);
        musicPlayer.current!.setVolume(0.05 * musicK);
        musicPlayer.current!.setPlaybackRate(1);
        musicPlayer.current!.play();
    }, [musicPlayer, soundSettings.getMusicK()])

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
                <Jail position={JAIL_POSITION_ARRAY} scale={[1.5, 1.5, 1.5]}/>
            </Board>
            <TreasuryDeck/>
            <ChanceDeck/>
            <BoardBackground/>
            <ModalPopupProvider/>
            <CellInfoPopupProvider/>
            {/*<TradePopup type={"outcoming"} userMoneyAmount={200} userProperties={[*/}
            {/*    {name: "Красная улица", price: 100},*/}
            {/*    {name: "Красная улица", price: 100},*/}
            {/*    {name: "Красная улица", price: 100},*/}
            {/*    {name: "Красная улица", price: 100},*/}
            {/*]} opponents={*/}
            {/*    [*/}
            {/*        {name: "let45fc.near", moneyAmount: 1000, properties: [*/}
            {/*            {name: "let45fc улица", price: 100},*/}
            {/*            {name: "let45fc улица", price: 100},*/}
            {/*            {name: "let45fc улица", price: 100},*/}
            {/*            {name: "let45fc улица", price: 100},*/}
            {/*        ]},*/}
            {/*        {name: "kastet99.near", moneyAmount: 1000, properties: [*/}
            {/*            {name: "kastet99 улица", price: 100},*/}
            {/*            {name: "kastet99 улица", price: 100},*/}
            {/*            {name: "kastet99 улица", price: 100},*/}
            {/*            {name: "kastet99 улица", price: 100},*/}
            {/*        ]},*/}
            {/*        {name: "uriiyurii.near", moneyAmount: 1000, properties: [*/}
            {/*            {name: "uriiyurii улица", price: 100},*/}
            {/*            {name: "uriiyurii улица", price: 100},*/}
            {/*            {name: "uriiyurii улица", price: 100},*/}
            {/*            {name: "uriiyurii улица", price: 100},*/}
            {/*        ]},*/}
            {/*    ]*/}
            {/*} onTrade={(...args) => console.log(args)}/>*/}
            <ambientLight intensity={1} position={[0, 10, 0]}/>
            <directionalLight intensity={0.1} position={[0, 10, 0]}/>
        </>
    )
}
