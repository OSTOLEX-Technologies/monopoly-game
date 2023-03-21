import {Mesh} from "three";
import React from "react";
import { Canvas, useFrame } from '@react-three/fiber'


function MyRotatingBox(props: {args: Array<number>}) {
    const myMesh = React.useRef<Mesh>() as React.RefObject<Mesh>;

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        if (myMesh.current) {
            myMesh.current.rotation.x = a;
        }
    });

    return (
        <mesh ref={myMesh}>
            <boxBufferGeometry args={props.args}/>
            <meshPhongMaterial color="royalblue" />
        </mesh>
    );
}


export function Scene() {
    return (
        <Canvas>
            <MyRotatingBox args={[3, 3, 3]}/>
            <ambientLight intensity={0.4} />
            <directionalLight color="red" position={[0, 0, 5]} />
        </Canvas>
    )
}
