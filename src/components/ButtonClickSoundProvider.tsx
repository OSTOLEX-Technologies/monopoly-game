import {createContext, ReactNode, useContext, useEffect, useRef} from "react";
import {AudioListenerContext} from "../constants";
// import {Audio, AudioLoader} from "three";
import {useLoader} from "@react-three/fiber";
import buttonClickSound from '../assets/sounds/SFX/button click.mp3';
import {preloadSound} from "../sounds";

export const ButtonClickSoundContext = createContext<(callback: () => void) => void>(() => {});

type ButtonClickSoundProviderProps = {
    children: ReactNode
}

preloadSound(buttonClickSound);

export function ButtonClickSoundProvider({children}: ButtonClickSoundProviderProps) {

    const playSound = (callback: () => void = () => {}) => {
        const audio = new Audio(buttonClickSound)
        audio.volume = 0.3
        audio.play()
        callback()
    }

    return (
        <>
            <ButtonClickSoundContext.Provider value={playSound}>
                {children}
            </ButtonClickSoundContext.Provider>
        </>
    )
}