import {ThreeEvent, useLoader} from "@react-three/fiber";
import {TextureLoader, Vector3, Matrix3, Vector2} from "three";
import {ownerIcons, OwnerIconsTypes, PieceColor} from "../constants";

type CircleChipProps = {
    type: OwnerIconsTypes;
    color: PieceColor;
    position?: [number, number, number]
    scale?: [number, number, number];
    rotation?: [number, number, number];
}

export function CircleChip(
    {
        position = [0, 0, 0],
        scale = [1, 1, 1],
        rotation = [0, 0, 0],
        ...props
    }: CircleChipProps) {
    const colorMap = useLoader(TextureLoader, ownerIcons[props.type])
    colorMap.offset = new Vector2(-0.35, -0.35)
    colorMap.repeat.set(1.7, 1.7)

    position[1] += 0.001
    const secondPosition = new Vector3(position[0], position[1] + 0.001, position[2])
    return (
        <>
            <mesh position={position} scale={scale} rotation={[-Math.PI/2, 0, Math.PI]} >
                <circleGeometry args={[0.25, 31]}/>
                <meshPhongMaterial color={props.color}/>
            </mesh>
            <mesh position={secondPosition} scale={scale} rotation={[-Math.PI/2, 0, Math.PI]} >
                <circleGeometry args={[0.25, 31]}/>
                <meshPhongMaterial map={colorMap} transparent/>
            </mesh>
        </>
    )

}
