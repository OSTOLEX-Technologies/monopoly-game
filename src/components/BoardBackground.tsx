
export function BoardBackground() {
    return (
        <mesh position={[0, -0.01, 0]} scale={[-9.1, -9.1, 9.1]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry />
            <meshPhongMaterial color={"white"} />
        </mesh>
    )
}