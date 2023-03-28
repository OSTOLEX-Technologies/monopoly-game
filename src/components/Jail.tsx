import {ThreeEvent, useLoader} from "@react-three/fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";

type JailProps = {
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
}

export function Jail(
    {
        position = [0, 0, 0],
        scale = [1, 1, 1],
        rotation = [0, 0, 0]
    }: JailProps) {
    const mtl = useLoader(MTLLoader, import.meta.env.BASE_URL + 'models/jail.mtl');
    const obj = useLoader(OBJLoader, import.meta.env.BASE_URL + 'models/jail.obj', (loader) => {
        mtl.preload();
        loader.setMaterials(mtl);
    })
    const new_obj = obj.clone();
    return (
        <primitive object={new_obj} position={position} scale={scale} rotation={rotation} />
    )
}
