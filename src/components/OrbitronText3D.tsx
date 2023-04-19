import {extend, useLoader} from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

extend({ TextGeometry })

interface OrbitronTextProps {
    text: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale?: [number, number, number];
}

export default function OrbitronText(props: OrbitronTextProps) {
    const font = useLoader(FontLoader, 'fonts/Orbitron_Regular.json');

    return (
        <mesh position={props.position} rotation={props.rotation} scale={props.scale || [1, 1, 1]}>
            { /* @ts-ignore */}
            <textGeometry args={[props.text, {
                font: font,
                size: 0.3,
                height: 0.05,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 5
            }]}/>
            <meshLambertMaterial attach='material' color={'white'}/>
        </mesh>
    )
}