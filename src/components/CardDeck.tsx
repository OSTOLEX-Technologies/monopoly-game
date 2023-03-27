import {ThreeEvent, useLoader} from "@react-three/fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";

type CardDeckProps = {
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
}

export function CardDeck(
    {
        position = [0, 0, 0],
        scale = [1, 1, 1],
        rotation = [0, 0, 0]
    }: CardDeckProps) {
    const mtl = useLoader(MTLLoader, import.meta.env.BASE_URL + 'models/card_deck.mtl');
    const obj = useLoader(OBJLoader, import.meta.env.BASE_URL + 'models/card_deck.obj', (loader) => {
        mtl.preload();
        console.log(mtl)
        loader.setMaterials(mtl);
    })
    const new_obj = obj.clone();
    // console.log(new_obj)
    return (
        <primitive
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
                console.log(e)
            }}
            object={new_obj} position={position} scale={scale} rotation={rotation} />
    )
}
