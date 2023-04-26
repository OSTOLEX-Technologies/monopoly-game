import {moneyChipsTypes} from "../constants";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {useLoader} from "@react-three/fiber";
import {DoubleSide} from "three";
import {useGLTF} from "@react-three/drei";

const moneyChips = Object.freeze({
    [moneyChipsTypes.Silver]: import.meta.env.BASE_URL + 'models/moneysilver.gltf',
    [moneyChipsTypes.Gold]: import.meta.env.BASE_URL + 'models/moneygold.gltf',
})

useGLTF.preload(moneyChips[moneyChipsTypes.Silver])
useGLTF.preload(moneyChips[moneyChipsTypes.Gold])

interface MoneyChipProps {
    type: moneyChipsTypes;
    position?: [number, number, number];
    scale?: [number, number, number];
}

export function MoneyChip(props: MoneyChipProps) {
    const {scene} = useGLTF(moneyChips[props.type]);
    const new_obj = scene.clone();
    const position = props.position || [0, 0, 0];
    const scale = props.scale || [1, 1, 1];
    return (
        <primitive object={new_obj} position={position} scale={scale}/>
    )
}