import {useModalPopup} from "../hooks";
import {useEffect, useState} from "react";
import {ModalPopup} from "./ui/ModalPopup";


export function ModalPopupProvider() {
    const {modalPopupData, showPopup, setShowPopup} = useModalPopup();

    const yesCallback = () => {
        setShowPopup(false);
        modalPopupData.yesCallback();
    };
    const noCallback = () => {
        setShowPopup(false);
        modalPopupData.noCallback();
    };
    return (
        <>
            {showPopup ? <ModalPopup message={modalPopupData.message} yesCallback={yesCallback} noCallback={noCallback}
                                        yesText={modalPopupData.yesText} noText={modalPopupData.noText}/> : <></>}
        </>
    )
}