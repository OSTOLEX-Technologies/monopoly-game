import {moneyChipsTypes} from "../constants";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {useLoader} from "@react-three/fiber";

const moneyChips = Object.freeze({
    [moneyChipsTypes.Bronze]: {
        obj: import.meta.env.BASE_URL + 'models/moneybronze.obj',
        mtl: import.meta.env.BASE_URL + 'models/moneybronze.mtl'
    },
    [moneyChipsTypes.Silver]: {
        obj: import.meta.env.BASE_URL + 'models/moneysilver.obj',
        mtl: import.meta.env.BASE_URL + 'models/moneysilver.mtl'
    },
    [moneyChipsTypes.Gold]: {
        obj: import.meta.env.BASE_URL + 'models/moneygold.obj',
        mtl: import.meta.env.BASE_URL + 'models/moneygold.mtl'
    }
})

interface MoneyChipProps {
    type: moneyChipsTypes;
    position?: [number, number, number];
}

export function MoneyChip(props: MoneyChipProps) {
    const mtl = useLoader(MTLLoader, moneyChips[props.type].mtl);
    const obj = useLoader(OBJLoader, moneyChips[props.type].obj, (loader) => {
        mtl.preload();
        loader.setMaterials(mtl);
    });
    const new_obj = obj.clone();
    const position = props.position || [0, 0, 0];
    return (
        <primitive object={new_obj} position={position} scale={[1, 1, 1]}/>
    )
}