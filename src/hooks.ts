import {boardView, balanceManager, reactCellsManager, reactBalanceManager} from "./viewGlobals";
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
