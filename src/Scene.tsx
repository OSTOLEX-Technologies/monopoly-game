import * as THREE from "three";
import React from "react";
import {OrbitControls} from '@react-three/drei';
import {Board, CellsLines} from "./Board";
import tests from "./game/test";


export function Scene() {
  tests()
    return (
        <>
            <OrbitControls/>
            <primitive object={new THREE.AxesHelper(11)}/>
            <Board />
            <CellsLines/>
            <ambientLight intensity={1} position={[0, 10, 0]}/>
            <directionalLight color="red" position={[0, 0, 5]}/>
        </>
    )
}
