import { Scene } from "./Scene";
import './App.css'
import {Canvas} from "@react-three/fiber";
import {Vector3} from "three";

function App() {
  return (
    <div className="App">
        <Canvas shadows camera={{fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1, far: 20,
            position: new Vector3(0, 10, -8.5)}}>
            <Scene/>
        </Canvas>
    </div>
  )
}

export default App
