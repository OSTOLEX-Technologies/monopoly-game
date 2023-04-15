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
    reactChanceCardsManager, reactTreasuryCardsManager, reactModalPopupManager
} from "./viewGlobals";
import {ModalPopupData} from "./ReactManagers";
import {useEffect, useState} from "react";

export function useCells() {
    const [cells, setCells] = useState(boardView.cells);
    useEffect(() => {
        reactCellsManager.onSetCells(setCells);
        return () => reactCellsManager.unSetCells(setCells);
    }, []);
    return cells;
}


export function useBalance() {
    const [balance, setBalance] = useState(balanceManager.getBalance());
    useEffect(() => {
        reactBalanceManager.onSetBalance(setBalance);
        return () => reactBalanceManager.unSetBalance(setBalance);
    }, []);
    return balance;
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