import { Scene } from "./components/Scene";
import './App.css'
import {Canvas} from "@react-three/fiber";
import {NoToneMapping, sRGBEncoding, Vector3, PerspectiveCamera} from "three";
import {Money} from "./components/ui/Money";
import {PlayersTable} from "./components/ui/PlayersTable";
import {UI} from "./components/ui/UI";

function App() {
    const camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 14, -9.5);
    camera.lookAt(0, 0, -0.75);
    return (
        <div className="App">
            <Canvas shadows camera={camera}
                dpr={window.devicePixelRatio}
            >
                <color attach="background" args={['#000']} />
                <Scene/>
            </Canvas>
            <UI/>
        </div>
    )
}

export default App
