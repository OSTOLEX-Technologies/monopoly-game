import {boardView, reactCellsManager} from "./viewGlobals";
import {useEffect, useState} from "react";

export function useCells() {
    const [cells, setCells] = useState(boardView.cells);
    useEffect(() => {
        reactCellsManager.onSetCells(setCells);
        return () => reactCellsManager.unSetCells(setCells);
    }, []);
    return cells;
}
