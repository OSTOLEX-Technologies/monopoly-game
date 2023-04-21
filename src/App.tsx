import { Scene } from "./components/Scene";
import './App.css'
import {Canvas} from "@react-three/fiber";
import {NoToneMapping, sRGBEncoding, Vector3, PerspectiveCamera, AudioListener} from "three";
import {Money} from "./components/ui/Money";
import {PlayersTable} from "./components/ui/PlayersTable";
import {UI} from "./components/ui/UI";
import {createContext, useContext, useState} from "react";
import {AudioListenerContext} from "./constants";
import {StartScreen} from "./components/ui/StartScreen";


function App() {
    const audioListener = useContext(AudioListenerContext);
    const camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 14, -9.5);
    camera.lookAt(0, 0, -0.75);
    camera.add(audioListener);

    const [startGame, setStartGame] = useState(false);
    return (
        <div className="App">
            <AudioListenerContext.Provider value={audioListener}>
                {
                    !startGame && <StartScreen callback={() => setStartGame(true)}/>
                }
                {
                    startGame && (
                        <>
                            <Canvas shadows camera={camera}
                                    dpr={window.devicePixelRatio}
                            >
                                <color attach="background" args={['#000']} />
                                <Scene/>
                            </Canvas>
                            <UI/>
                        </>
                    )
                }
            </AudioListenerContext.Provider>
        </div>
    )
}

export default App
