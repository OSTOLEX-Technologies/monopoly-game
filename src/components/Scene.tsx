import * as THREE from "three";
import React from "react";
import {OrbitControls} from '@react-three/drei';
import {Board} from "./Board";
import {Animator} from "./Animator";
import {CardDeck} from "./CardDeck";
import {Jail} from "./Jail";
import {JAIL_POSITION_ARRAY} from "../constants";

export function Scene() {
    return (
        <>
            <OrbitControls/>
            <primitive object={new THREE.AxesHelper(11)}/>
            <Animator/>
            <Board>
                <CardDeck rotation={[0, Math.PI / 4, 0]} position={[1.8, 0, 1.8]}/>
                <CardDeck rotation={[0, Math.PI / 4, 0]} position={[-1.8, 0, -1.8]}/>
                <Jail position={JAIL_POSITION_ARRAY} scale={[1.5, 1.5, 1.5]}/>
                {/*<TestAnimation/>*/}
            </Board>
            <ambientLight intensity={1} position={[0, 10, 0]}/>
            <directionalLight intensity={0.3} position={[0, 10, 0]}/>
            {/*<Exporter/>*/}
        </>
    )
}
