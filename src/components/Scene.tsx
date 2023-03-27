import * as THREE from "three";
import React, {Suspense} from "react";
import {OrbitControls} from '@react-three/drei';
import {Board} from "./Board";
import {Animator} from "./Animator";
import {CardDeck} from "./CardDeck";


export function Scene() {
    return (
        <>
            <OrbitControls/>
            <primitive object={new THREE.AxesHelper(11)}/>
            <Animator/>
            <Suspense fallback={null}>
                <Board>
                </Board>
            </Suspense>
            <CardDeck rotation={[0, Math.PI / 4, 0]} position={[1.5, 0, 1.5]}/>
            <CardDeck rotation={[0, Math.PI / 4, 0]} position={[-1.5, 0, -1.5]}/>
            <ambientLight intensity={1} position={[0, 10, 0]}/>
        </>
    )
}
