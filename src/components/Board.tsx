import * as THREE from "three";
import {ThreeEvent} from "@react-three/fiber";
import React, {useContext} from "react";
import {Piece} from "./Piece";
import {CellsContext} from "./Scene";

export type BoardProps = {
    onClick?: (e: ThreeEvent<MouseEvent>) => void
}

export function Board({children = [], onClick = (e) => {}}: React.PropsWithChildren<BoardProps>) {
    const cells = useContext(CellsContext)
    return (
        <>
            <mesh onClick={onClick} position={[0, 0, 0]} scale={[11, 11, 11]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry />
                <meshPhongMaterial color="#272a30" />
            </mesh>
            {cells.map((cell, i) => {
                if (cell.getPieces().length > 0) return (
                    <React.Fragment key={i}>
                        {cell.getPieces().filter(piece => piece).map((piece, j) => (
                                <Piece piecePresenter={piece!} key={`${i}-${piece!.object3D?.uuid}`} cellIndex={i}/>
                            )
                        )}
                    </React.Fragment>
                )
            })}
            {children}
        </>
    )
}

export function CellsLines() {
    // draw monopoly cells using tubular geometry
    const innerLine: Array<THREE.CatmullRomCurve3> = [];
    const cellsLines: Array<THREE.CatmullRomCurve3> = [];
    innerLine.push(new THREE.CatmullRomCurve3(
        [
            new THREE.Vector3(-4.5, 0, -4.5),
            new THREE.Vector3(-4.5, 0, 4.5)
        ]
    ));
    innerLine.push(new THREE.CatmullRomCurve3(
        [
            new THREE.Vector3(-4.5, 0, 4.5),
            new THREE.Vector3(4.5, 0, 4.5)
        ]
    ));
    innerLine.push(new THREE.CatmullRomCurve3(
        [
            new THREE.Vector3(4.5, 0, 4.5),
            new THREE.Vector3(4.5, 0, -4.5)
        ]
    ));
    innerLine.push(new THREE.CatmullRomCurve3(
        [
            new THREE.Vector3(4.5, 0, -4.5),
            new THREE.Vector3(-4.5, 0, -4.5)
        ]
    ));
    for (let i = -4.5; i <= 4.5; i += 1) {
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(i, 0, -5.5),
            new THREE.Vector3(i, 0, -4.5)
        ]));
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(i, 0, 5.5),
            new THREE.Vector3(i, 0, 4.5)
        ]));
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5.5, 0, i),
            new THREE.Vector3(-4.5, 0, i)
        ]));
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(5.5, 0, i),
            new THREE.Vector3(4.5, 0, i)
        ]));
    }
    return (
        <group>
            {innerLine.map((curve, index) => (
                <mesh key={index}>
                    <tubeGeometry args={[curve, 4, 0.01, 100, false]}/>
                    <meshBasicMaterial color="white"/>
                </mesh>
            ))}
            {cellsLines.map((line, index) => (
                <mesh key={index}>
                    <tubeGeometry args={[line, 1, 0.01, 8, false]}/>
                    <meshBasicMaterial color="white"/>
                </mesh>
            ))}
        </group>
    )
}