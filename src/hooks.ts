import {
    boardView,
    balanceManager,
    reactCellsManager,
    reactBalanceManager,
    reactPropertyManager,
    propertyManager,
    playersManager,
    reactPlayersManager,
    reactGameHistoryManager,
    gameHistoryManager,
    reactChanceCardsManager, reactTreasuryCardsManager, reactModalPopupManager, reactCellInfoPopupManager
} from "./viewGlobals";
import {CellInfoPopupData, ModalPopupData} from "./ReactManagers";
import {useEffect, useState} from "react";
import {ThreeEvent} from "@react-three/fiber";
import {getCellInfoPopupData} from "./utils";

export function useCells() {
    const [cells, setCells] = useState(boardView.cells);
    useEffect(() => {
        reactCellsManager.onSetCells(setCells);
        return () => reactCellsManager.unSetCells(setCells);
    }, []);
    return cells;
}


export function useBalance(): [number, () => void, () => void] {
    const [balance, setBalance] = useState(balanceManager.getBalance());
    const bankruptHandler = () => {
        balanceManager.dispatchEvent("bankrupt")
    }
    const tradeHandler = () => {
        balanceManager.dispatchEvent("trade")
    }
    useEffect(() => {
        reactBalanceManager.onSetBalance(setBalance);
        return () => reactBalanceManager.unSetBalance(setBalance);
    }, []);
    return [balance, bankruptHandler, tradeHandler];
}


export function useProperty() {
    const [property, setProperty] = useState(propertyManager.getProperties());
    useEffect(() => {
        reactPropertyManager.onSetProperty(setProperty);
        return () => reactPropertyManager.unSetProperty(setProperty);
    }, []);
    return property;
}

export function usePlayers() {
    const [players, setPlayers] = useState(playersManager.getPlayers());
    useEffect(() => {
        reactPlayersManager.onSetPlayers(setPlayers);
        return () => reactPlayersManager.unSetPlayers(setPlayers);
    }, []);
    return players;
}

export function useHistory() {
    const [history, setHistory] = useState(gameHistoryManager.getHistory());
    useEffect(() => {
        reactGameHistoryManager.onSetGameHistory(setHistory);
        return () => reactGameHistoryManager.unSetGameHistory(setHistory);
    }, []);
    return history;
}

export function useChanceCard(callback: (description: string) => void) {
    const [description, setDescription] = useState("");
    const [ignore, setIgnore] = useState(true);
    useEffect(() => {
        reactChanceCardsManager.onSetChanceCard(setDescription);
        if (!ignore)
            callback(description);
        setIgnore(false);
        return () => {
                reactChanceCardsManager.unSetChanceCard(setDescription);
            }
    }, [description]);
}

export function useTreasuryCard(callback: (description: string) => void) {
    const [description, setDescription] = useState("");
    const [ignore, setIgnore] = useState(true);
    useEffect(() => {
        reactTreasuryCardsManager.onSetTreasuryCard(setDescription);
        if (!ignore)
            callback(description);
        setIgnore(false);
        return () => {
            reactTreasuryCardsManager.unSetTreasuryCard(setDescription);
        }
    }, [description]);
}

export function useModalPopup() {
    const [modalPopupData, setModalPopupData] = useState<ModalPopupData>({
        message: "",
        yesCallback: () => {},
        noCallback: () => {},
        yesText: "",
        noText: ""
    });
    const [showPopup, setShowPopup] = useState(false);
    const handler = (data: ModalPopupData) => {
        setModalPopupData(data);
        setShowPopup(true);
    }
    useEffect(() => {
        reactModalPopupManager.onSetModalPopup(handler);
        return () => reactModalPopupManager.unSetModalPopup(handler);
    }, [modalPopupData]);
    return {modalPopupData, showPopup, setShowPopup};
}

export function useBoardOnHoverCallbacks(): [
    (cellIndex: number, e: ThreeEvent<MouseEvent>) => void,
    (e: ThreeEvent<MouseEvent>) => void] {
    const intervalTime = 500;
    return [
        (cellIndex: number, e: ThreeEvent<MouseEvent>) => {
            reactCellInfoPopupManager.showPopupWithDelay(getCellInfoPopupData(cellIndex), intervalTime);
        },
        (e: ThreeEvent<MouseEvent>) => {
            reactCellInfoPopupManager.hidePopupWithDelay(intervalTime);
            reactCellInfoPopupManager.cancelShowPopup();
        }
    ]
}

export function useCellInfoPopup(): [CellInfoPopupData, boolean] {
    const [popupData, setPopupData] = useState<CellInfoPopupData>({
        header: "",
        description: "",
        logo: "",
    });
    const [showPopup, setShowPopup] = useState(false);
    const handler = (data: CellInfoPopupData) => {
        setPopupData(data);
        setShowPopup(true);
    }
    useEffect(() => {
        reactCellInfoPopupManager.onCellInfoPopup(handler);
        reactCellInfoPopupManager.onCellInfoShow(setShowPopup)
        return () => {
            reactCellInfoPopupManager.unCellInfoPopup(handler);
            reactCellInfoPopupManager.unCellInfoShow(setShowPopup)
        }
    }, [popupData, showPopup]);
    return [popupData, showPopup];
}