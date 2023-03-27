import { Scene } from "./components/Scene";
import './App.css'
import {Canvas} from "@react-three/fiber";
import {NoToneMapping, sRGBEncoding, Vector3} from "three";

function App() {
  return (
    <div className="App">
        <Canvas shadows camera={{fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1, far: 100,
            position: new Vector3(0, 8, -7)}}
            dpr={window.devicePixelRatio}>
            <Scene/>
        </Canvas>
    </div>
  )
}

export default App
