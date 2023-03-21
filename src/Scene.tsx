import * as THREE from "three";
import React from "react";
import {OrbitControls} from '@react-three/drei';
import {Board, Cells} from "./Board";


export function Scene() {
    return (
        <>
            <OrbitControls/>
            <primitive object={new THREE.AxesHelper(11)}/>
            <Board/>
            <Cells/>
            <ambientLight intensity={1} position={[0, 10, 0]}/>
            <directionalLight color="red" position={[0, 0, 5]}/>
        </>
    )
}
