import {TextureLoader, Vector3} from "three";
import {ThreeEvent, useLoader} from "@react-three/fiber";
import {Fragment, PropsWithChildren} from "react";
import {Piece} from "./Piece";
import {useBoardOnHoverCallbacks, useCells} from "../hooks";
import {OwnerChip} from "./OwnerChip";
import OrbitronText from "./OrbitronText3D";
import {CellPriceType} from "../constants";
import {MoneyChip} from "./MoneyChip";

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
                            <Fragment key={`${i}-pieces`}>
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
                        {
                            cell.getCoinsData().length > 0 && (
                                <Fragment key={`${i}-moneyChip`}>
                                    {cell.getCoinsData().map((coinData, j) => (
                                        <MoneyChip type={coinData.type} key={`${i}-${j}`}
                                                   position={coinData.position} scale={coinData.scale}/>
                                    ))}
                                </Fragment>
                            )
                        }
                        {/* spawn transparent plane above every cell*/}
                       <mesh onPointerEnter={(e) => onEnterCallback(cell.index, e)} onPointerOut={onLeaveCallback} rotation={[-Math.PI / 2, 0, 0]} position={cell.getCenter3().clone().add(new Vector3(0, 0.01, 0))}>
                            <planeGeometry />
                            <meshPhongMaterial opacity={0} transparent={true}/>
                       </mesh>
                    </Fragment>
                ))
            }

            {children}
        </>
    )
}
