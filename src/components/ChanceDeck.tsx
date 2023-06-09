import {useFrame} from "@react-three/fiber";
import {useGLTF} from "@react-three/drei";
import * as THREE from "three";
import {useEffect, useState} from "react";
import {useChanceCard} from "../hooks";
import {CardPopup} from "./ui/CardPopup";
import {CardType} from "../constants";
import {reactChanceCardsManager} from "../viewGlobals";

let description = "";

export function ChanceDeck() {
    const {scene, animations} = useGLTF(import.meta.env.BASE_URL + 'models/chance_card_deck.gltf');
    const [showPopup, setShowPopup] = useState(false);
    const new_obj = scene.clone();
    const mixer = new THREE.AnimationMixer(new_obj);
    const setDescription = useChanceCard((newDescription) => {
        animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.repetitions = 1;
            action.reset()
            action.play();
        });
        // I don't know why this doesn't work, so I'm using a global variable instead
        // setDescription(newDescription);
        description = newDescription;
    })
    useEffect(() => {
        mixer.addEventListener('finished', (e) => {
            setShowPopup(true);
        })
    })
    const onClosePopup = () => {
        setShowPopup(false)
        setDescription("");
    };
    useFrame((state, delta) => {
        mixer.update(delta);
    });
    reactChanceCardsManager.isPopupShown = showPopup;
    return (
        <>
            <primitive object={new_obj} rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
            { showPopup ? <CardPopup type={CardType.Chance} description={description} closeCallback={onClosePopup} /> : <></>}
        </>
    )
}
