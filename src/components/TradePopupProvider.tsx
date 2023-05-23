import {useTradePopup} from "../hooks";
import {TradePopup} from "./ui/TradePopup";


export function TradePopupProvider() {
    const {tradePopupData, showPopup, setShowPopup} = useTradePopup();

    const closeCallback = () => {
        setShowPopup(false);
    }

    const acceptCallback = () => {
        setShowPopup(false);
        if (tradePopupData.onAccept)
            tradePopupData.onAccept();
    }

    const declineCallback = () => {
        setShowPopup(false);
        if (tradePopupData.onDecline)
            tradePopupData.onDecline();
    }

    const tradeCallback = (...args: any[]) => {
        setShowPopup(false);
        if (tradePopupData.onTrade)  // @ts-ignore
            tradePopupData.onTrade(...args);
    }

    return (
        <>
            {showPopup ? <TradePopup type={tradePopupData.type} userBalance={tradePopupData.userBalance}
                                     userProperties={tradePopupData.userProperties}
                                     opponents={tradePopupData.opponents} onClose={closeCallback}
                                     onAccept={acceptCallback} onDecline={declineCallback} onTrade={tradeCallback}
            /> : <></>}
        </>
    )
}
