import {useCellInfoPopup} from "../hooks";
import {CellInfoPopup} from "./ui/CellInfoPopup";
import {reactCellInfoPopupManager} from "../viewGlobals";

export function CellInfoPopupProvider() {
    const [popupData, showPopup] = useCellInfoPopup();

    return (
        <>
            {showPopup && (<CellInfoPopup {...popupData}
                                          onPointerOver={(e) => {
                                              reactCellInfoPopupManager.cancelHidePopup();
                                          }}
                                          onPointerLeave={(e) => {
                                              reactCellInfoPopupManager.hidePopup();
                                          }}
            />) }
        </>
    );
}