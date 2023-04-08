import { Scene } from "./components/Scene";
import './App.css'
import {Canvas} from "@react-three/fiber";
import {NoToneMapping, sRGBEncoding, Vector3} from "three";
import {Money} from "./components/ui/Money";
import {PlayersTable} from "./components/ui/PlayersTable";
import {UI} from "./components/ui/UI";

function App() {
  return (
    <div className="App">
        <Canvas shadows camera={{fov: 30,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1, far: 100,
            position: new Vector3(0, 15, -9)}}
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
