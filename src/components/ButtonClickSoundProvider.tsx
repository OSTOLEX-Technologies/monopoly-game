import {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {AudioListenerContext} from "../constants";
// import {Audio, AudioLoader} from "three";
import {useLoader} from "@react-three/fiber";
import buttonClickSound from '../assets/sounds/SFX/button click.mp3';

export const ButtonClickSoundContext = createContext<() => void>(() => {});

type ButtonClickSoundProviderProps = {
    children: ReactNode
}

export function ButtonClickSoundProvider({children}: ButtonClickSoundProviderProps) {
    const audio = new Audio(buttonClickSound)

    const playSound = () => {
        audio.volume = 0.3
        audio.play()
    }

    return (
        <>
            <ButtonClickSoundContext.Provider value={playSound}>
                {children}
            </ButtonClickSoundContext.Provider>
        </>
    )
}