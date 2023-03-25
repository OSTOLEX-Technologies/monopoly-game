import {useFrame} from "@react-three/fiber";
import {animationRenderersManager} from "../viewGlobals";


export const Animator = () => {
    useFrame((rootState) => {
        animationRenderersManager.render(rootState);
    });
    return (<></>);
}