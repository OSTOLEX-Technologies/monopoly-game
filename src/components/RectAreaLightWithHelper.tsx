import {RectAreaLightUniformsLib} from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import {useThree} from "@react-three/fiber";
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";
import {RectAreaLight, Vector3} from "three";


type RectArealightWithHelperProps = {
    position?: [number, number, number];
    lookAt?: [number, number, number];
    width?: number;
    height?: number;
    intensity?: number;
    color?: string;
}


export function RectAreaLightWithHelper(
    {
        position = [0, 0, 0],
        lookAt = [0, 0, 0],
        width = 1,
        height = 1,
        intensity = 1,
        color = "white"
    }: RectArealightWithHelperProps
) {
    const { scene } = useThree();

    RectAreaLightUniformsLib.init();

    const rectLight = new RectAreaLight(color, intensity, width, height);

    rectLight.position.set(...position);
    rectLight.lookAt(...lookAt);
    scene.add(rectLight);
    scene.add(new RectAreaLightHelper(rectLight));
    return (
        <></>
    );
}
