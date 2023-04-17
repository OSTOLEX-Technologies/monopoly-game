import * as THREE from "three";
import React from "react";
import {OrbitControls} from '@react-three/drei';
import {Board} from "./Board";
import {Animator} from "./Animator";
import {Jail} from "./Jail";
import {JAIL_POSITION_ARRAY} from "../constants";
import {ChanceDeck} from "./ChanceDeck";
import {TreasuryDeck} from "./TreasuryDeck";
import {ModalPopupProvider} from "./ModalPopupProvider";
import {CellInfoPopup} from "./ui/CellInfoPopup";

export function Scene() {
    return (
        <>
            {/*<OrbitControls/>*/}
            <Animator/>
            <Board>
                <TreasuryDeck/>
                <Jail position={JAIL_POSITION_ARRAY} scale={[1.5, 1.5, 1.5]}/>
                <ChanceDeck/>
            </Board>
            <ModalPopupProvider/>
            {/*<ProjectsOnHoverPopup/>*/}
            <ambientLight intensity={1} position={[0, 10, 0]}/>
            <directionalLight intensity={0.3} position={[0, 10, 0]}/>
            {/*<Exporter/>*/}
        </>
    )
}
