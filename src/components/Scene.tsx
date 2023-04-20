import React from "react";
import {Board} from "./Board";
import {Animator} from "./Animator";
import {Jail} from "./Jail";
import {JAIL_POSITION_ARRAY, moneyChipsTypes} from "../constants";
import {ChanceDeck} from "./ChanceDeck";
import {TreasuryDeck} from "./TreasuryDeck";
import {ModalPopupProvider} from "./ModalPopupProvider";
import {CellInfoPopupProvider} from "./CellInfoPopupProvider";
import OrbitronText from "./OrbitronText3D";
import {BoardBackground} from "./BoardBackground";
import { OrbitControls } from "@react-three/drei";

export function Scene() {
    return (
        <>
            {/*<OrbitControls/>*/}
            <Animator/>
            <Board>
                <OrbitronText text={"OSTOLEX"} position={[-0.7, 0.01, 2.3]} rotation={[Math.PI/2, Math.PI, 0]}/>
                <TreasuryDeck/>
                <Jail position={JAIL_POSITION_ARRAY} scale={[1.5, 1.5, 1.5]}/>
                <ChanceDeck/>
            </Board>
            <BoardBackground/>
            <ModalPopupProvider/>
            <CellInfoPopupProvider/>
            <ambientLight intensity={1} position={[0, 10, 0]}/>
            <directionalLight intensity={0.3} position={[0, 10, 0]}/>
        </>
    )
}
