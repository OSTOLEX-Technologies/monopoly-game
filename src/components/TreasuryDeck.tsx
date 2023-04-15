import {useFrame} from "@react-three/fiber";
import {useGLTF} from "@react-three/drei";
import * as THREE from "three";
import {useEffect, useState} from "react";
import {useTreasuryCard} from "../hooks";
import {CardPopup} from "./ui/CardPopup";
import {CardType} from "../constants";

let description = "";

export function TreasuryDeck() {
    const {scene, animations} = useGLTF(import.meta.env.BASE_URL + 'models/treasury_card_deck.gltf');
    // const [description, setDescription] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const new_obj = scene.clone();
    const mixer = new THREE.AnimationMixer(new_obj);
    useTreasuryCard((newDescription) => {
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
        mixer.addEventListener('finished', () => {
            setShowPopup(true);
        })
    })
    const onClosePopup = () => {
        setShowPopup(false)
    };
    useFrame((state, delta) => {
        mixer.update(delta);
    });
    return (
        <>
            <primitive object={new_obj} rotation={[0, Math.PI, 0]} position={[0, 0, 0]} />
            { showPopup ? <CardPopup type={CardType.Treasury} description={description} closeCallback={onClosePopup} /> : <></>}
        </>
    )
}
