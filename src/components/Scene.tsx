import * as THREE from "three";
import React from "react";
import {OrbitControls} from '@react-three/drei';
import {Board, CellsLines} from "./Board";
import {Animator} from "./Animator";


export function Scene() {
    return (
        <>
            <OrbitControls/>
            <primitive object={new THREE.AxesHelper(11)}/>
            <Animator/>
            <Board/>
            <CellsLines/>
            <ambientLight intensity={2} position={[0, 5, 0]}/>
        </>
    )
}
