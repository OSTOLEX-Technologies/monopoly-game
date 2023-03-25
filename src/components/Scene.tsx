import * as THREE from "three";
import React from "react";
import {OrbitControls} from '@react-three/drei';
import {Board, CellsLines} from "./Board";
import {Animator} from "./Animator";
import {boardView} from "../viewGlobals";

export const CellsContext = React.createContext(boardView.cells)

export function Scene() {
    // boardView.setCells = setCells;
    return (
        <>
            <OrbitControls/>
            <primitive object={new THREE.AxesHelper(11)}/>
            <Animator/>
            {/*<CellsContext.Provider value={cells}>*/}
                <Board/>
            {/*</CellsContext.Provider>*/}
            <CellsLines/>
            <ambientLight intensity={1} position={[0, 10, 0]}/>
        </>
    )
}
