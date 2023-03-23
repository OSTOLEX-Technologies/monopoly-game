import * as THREE from "three";

export function Board() {
    return (
        <mesh position={[0, 0, 0]} scale={[11, 11, 11]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry />
            <meshPhongMaterial color="white" />
        </mesh>
    )
}

export function Cells() {
    // draw monopoly cells using tubular geometry
    const innerLine = new THREE.CurvePath();
    const cellsLines: Array<THREE.CatmullRomCurve3> = [];
    innerLine.add(new THREE.LineCurve3(
        new THREE.Vector3(-4.5, 0, -4.5),
        new THREE.Vector3(-4.5, 0, 4.5)
    ));
    innerLine.add(new THREE.LineCurve3(
        new THREE.Vector3(-4.5, 0, 4.5),
        new THREE.Vector3(4.5, 0, 4.5)
    ));
    innerLine.add(new THREE.LineCurve3(
        new THREE.Vector3(4.5, 0, 4.5),
        new THREE.Vector3(4.5, 0, -4.5)
    ));
    innerLine.add(new THREE.LineCurve3(
        new THREE.Vector3(4.5, 0, -4.5),
        new THREE.Vector3(-4.5, 0, -4.5)
    ));
    for (let i = -4.5; i <= 4.5; i += 1) {
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(i, 0, -5.5),
            new THREE.Vector3(i, 0, -4.5)
        ]));
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(i, 0, 5.5),
            new THREE.Vector3(i, 0, 4.5)
        ]));
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5.5, 0, i),
            new THREE.Vector3(-4.5, 0, i)
        ]));
        cellsLines.push(new THREE.CatmullRomCurve3([
            new THREE.Vector3(5.5, 0, i),
            new THREE.Vector3(4.5, 0, i)
        ]));
    }
    return (
        <group>
            <mesh>
                <tubeBufferGeometry args={[innerLine, 4, 0.01, 100, false]}/>
                <meshBasicMaterial color="black"/>
            </mesh>
            {cellsLines.map((line, index) => (
                <mesh key={index}>
                    <tubeBufferGeometry args={[line, 1, 0.01, 8, false]}/>
                    <meshBasicMaterial color="black"/>
                </mesh>
            ))}
        </group>
    )
}