import {ThreeEvent, useLoader} from "@react-three/fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {useAnimations} from "@react-three/drei";
import {Vector3} from "three";


export function TestAnimation() {
    // const mtl = useLoader(MTLLoader, import.meta.env.BASE_URL + 'models/treasurycard_000001.mtl');
    // const obj = useLoader(OBJLoader, import.meta.env.BASE_URL + 'models/treasurycard_000001.obj', (loader) => {
    //     // mtl.preload();
    //     // loader.setMaterials(mtl);
    // })
    // const mtl = useLoader(MTLLoader, import.meta.env.BASE_URL + 'models/treasurycard_000001.mtl');
    const obj = useLoader(FBXLoader, import.meta.env.BASE_URL + 'models/card_back.fbx', (loader) => {
    })
    const animations = useAnimations(obj.animations)
    const new_obj = obj.clone();
    new_obj.scale.set(10, 10, 10)
    console.log(new_obj)
    return (
        <primitive object={new_obj} position={[0, 0, 0]} />
    )
}
