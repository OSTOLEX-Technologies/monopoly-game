import {TextureLoader, Vector3} from "three";
import {ThreeEvent, useLoader} from "@react-three/fiber";
import {Fragment, PropsWithChildren} from "react";
import {Piece} from "./Piece";
import {useBoardOnHoverCallbacks, useCells} from "../hooks";
import {OwnerChip} from "./OwnerChip";
import OrbitronText from "./OrbitronText3D";
import {CellPriceType} from "../constants";

export type BoardProps = {
    onClick?: (e: ThreeEvent<MouseEvent>) => void
}

export function Board({children = [], onClick = (e) => {}}: PropsWithChildren<BoardProps>) {
    const colorMap = useLoader(TextureLoader, import.meta.env.BASE_URL + 'board.png')
    const cells = useCells();
    const [onEnterCallback, onLeaveCallback] = useBoardOnHoverCallbacks();

    return (
        <>
            <mesh onClick={onClick} position={[0, 0, 0]} scale={[-9, -9, 9]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry />
                <meshPhongMaterial map={colorMap} />
            </mesh>
            {cells.map((cell, i) =>
                (
                    <Fragment key={i}>
                        {cell.getPieces().length > 0 &&
                            <Fragment key={i}>
                                {cell.getPieces().filter(piece => piece).map((piece, j) => (
                                    <Piece piecePresenter={piece!} key={`${i}-${piece!.uuid}`} cellIndex={i}/>
                                )
                                )}
                            </Fragment>
                        }
                        {
                            cell.getOwner() &&
                            <OwnerChip type={cell.getOwnerChipIcon()} color={cell.getOwner()!} position={cell.getOwnerChipPositionTuple()}/>
                        }
                        {
                            !cell.getOwner() && cell.hasOwnerChipIcon() &&
                            <OwnerChip type={cell.getOwnerChipIcon()} color={'white'} position={cell.getOwnerChipPositionTuple()}/>
                        }
                        {cell.getPrice() && cell.getPriceType() != CellPriceType.None &&
                            <OrbitronText text={
                                cell.getPriceType() == CellPriceType.Buy? `Buy: ${cell.getPrice()}$` : `Fee: ${cell.getPrice()}$`
                            } scale={[0.3, 0.3, 0.3]} position={cell.getPriceTextPositionTuple()} rotation={[Math.PI/2, Math.PI, 0]}/>
                        }
                       <mesh onPointerEnter={(e) => onEnterCallback(cell.index, e)} onPointerOut={onLeaveCallback} rotation={[-Math.PI / 2, 0, 0]} position={cell.getCenter3().clone().add(new Vector3(0, 0.01, 0))}>
                            <planeGeometry />
                            <meshPhongMaterial opacity={0} transparent={true}/>
                       </mesh>
                    </Fragment>
                ))
            }
            {/* spawn transparent cell above every cell*/}

            {children}
        </>
    )
}

// export function CellsLines() {
//     // draw monopoly cells using tubular geometry
//     const innerLine: Array<THREE.CatmullRomCurve3> = [];
//     const cellsLines: Array<THREE.CatmullRomCurve3> = [];
//     innerLine.push(new THREE.CatmullRomCurve3(
//         [
//             new THREE.Vector3(-4.5, 0, -4.5),
//             new THREE.Vector3(-4.5, 0, 4.5)
//         ]
//     ));
//     innerLine.push(new THREE.CatmullRomCurve3(
//         [
//             new THREE.Vector3(-4.5, 0, 4.5),
//             new THREE.Vector3(4.5, 0, 4.5)
//         ]
//     ));
//     innerLine.push(new THREE.CatmullRomCurve3(
//         [
//             new THREE.Vector3(4.5, 0, 4.5),
//             new THREE.Vector3(4.5, 0, -4.5)
//         ]
//     ));
//     innerLine.push(new THREE.CatmullRomCurve3(
//         [
//             new THREE.Vector3(4.5, 0, -4.5),
//             new THREE.Vector3(-4.5, 0, -4.5)
//         ]
//     ));
//     for (let i = -4.5; i <= 4.5; i += 1) {
//         cellsLines.push(new THREE.CatmullRomCurve3([
//             new THREE.Vector3(i, 0, -5.5),
//             new THREE.Vector3(i, 0, -4.5)
//         ]));
//         cellsLines.push(new THREE.CatmullRomCurve3([
//             new THREE.Vector3(i, 0, 5.5),
//             new THREE.Vector3(i, 0, 4.5)
//         ]));
//         cellsLines.push(new THREE.CatmullRomCurve3([
//             new THREE.Vector3(-5.5, 0, i),
//             new THREE.Vector3(-4.5, 0, i)
//         ]));
//         cellsLines.push(new THREE.CatmullRomCurve3([
//             new THREE.Vector3(5.5, 0, i),
//             new THREE.Vector3(4.5, 0, i)
//         ]));
//     }
//     return (
//         <group>
//             {innerLine.map((curve, index) => (
//                 <mesh key={index}>
//                     <tubeGeometry args={[curve, 4, 0.01, 100, false]}/>
//                     <meshBasicMaterial color="white"/>
//                 </mesh>
//             ))}
//             {cellsLines.map((line, index) => (
//                 <mesh key={index}>
//                     <tubeGeometry args={[line, 1, 0.01, 8, false]}/>
//                     <meshBasicMaterial color="white"/>
//                 </mesh>
//             ))}
//         </group>
//     )
// }