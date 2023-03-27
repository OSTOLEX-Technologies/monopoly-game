import React from 'react';
import {useLoader} from "@react-three/fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";
import {boardView} from "../viewGlobals";
import {PieceColor, PiecePresenter} from "../board";


const PieceColorsMapping = Object.freeze({
    [PieceColor.Blue]: {
        mtl: import.meta.env.BASE_URL + 'models/chipblue.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipblue.obj'
    },
    [PieceColor.Green]: {
        mtl: import.meta.env.BASE_URL + 'models/chipgreen.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipgreen.obj'
    },
    [PieceColor.Yellow]: {
        mtl: import.meta.env.BASE_URL + 'models/chipyellow.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipyellow.obj'
    },
    [PieceColor.Pink]: {
        mtl: import.meta.env.BASE_URL + 'models/chippink.mtl',
        obj: import.meta.env.BASE_URL + 'models/chippink.obj'
    },
    [PieceColor.Orange]: {
        mtl: import.meta.env.BASE_URL + 'models/chiporange.mtl',
        obj: import.meta.env.BASE_URL + 'models/chiporange.obj'
    },
    [PieceColor.LightPink]: {
        mtl: import.meta.env.BASE_URL + 'models/chiplightpink.mtl',
        obj: import.meta.env.BASE_URL + 'models/chiplightpink.obj'
    },
    [PieceColor.Purple]: {
        mtl: import.meta.env.BASE_URL + 'models/chippurple.mtl',
        obj: import.meta.env.BASE_URL + 'models/chippurple.obj'
    },
    [PieceColor.Navyblue]: {
        mtl: import.meta.env.BASE_URL + 'models/chipnavyblue.mtl',
        obj: import.meta.env.BASE_URL + 'models/chipnavyblue.obj'
    }
})


export type PieceProps = {
    cellIndex: number,
    piecePresenter: PiecePresenter,
}

export function Piece(props: PieceProps) {
    const mtl = useLoader(MTLLoader, PieceColorsMapping[props.piecePresenter.color].mtl);
    const obj = useLoader(OBJLoader, PieceColorsMapping[props.piecePresenter.color].obj, (loader) => {
        mtl.preload();
        loader.setMaterials(mtl);
    });
    const new_obj = obj.clone();
    props.piecePresenter.object3D = new_obj;
    return (
        <primitive object={new_obj} position={boardView.getCell(props.cellIndex).getPiecePosition(props.piecePresenter)}
            scale={[1, 1, 1]}/>
    )
}