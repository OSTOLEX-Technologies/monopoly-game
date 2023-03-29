import {BoardPresenter, CellPresenter} from "./board";
import {AnimationRenderersManager} from "./animationsRenderers";
import {PieceColor} from "./constants";

export const boardView = new BoardPresenter();

export class ReactCellsManager {
    public setCellsHandlers: Array<(cells: CellPresenter[]) => void> = [];

    public onSetCells(handler: (cells: CellPresenter[]) => void): void {
        this.setCellsHandlers.push(handler);
    }

    public unSetCells(handler: (cells: CellPresenter[]) => void): void {
        const index = this.setCellsHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setCellsHandlers.splice(index, 1);
    }
}
export const reactCellsManager = new ReactCellsManager();

export function keepReactCellsUpdated(target: BoardPresenter, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = (...args: any[])  => {
        const toReturn = originalMethod.call(boardView, ...args);
        for (const handler of reactCellsManager.setCellsHandlers) {
            handler([...boardView.cells])
        }
        return toReturn;
    }
    return descriptor
}

const piece1 = boardView.addPiece(0, PieceColor.Blue);
const piece2 = boardView.addPiece(0, PieceColor.Green);
const piece3 = boardView.addPiece(0, PieceColor.Pink);
const piece4 = boardView.addPiece(0, PieceColor.Purple);
const piece5 = boardView.addPiece(0, PieceColor.Red);
const piece6 = boardView.addPiece(0, PieceColor.Yellow);
const piece7 = boardView.addPiece(0, PieceColor.Navyblue);
const piece8 = boardView.addPiece(0, PieceColor.Orange);


export const animationRenderersManager = new AnimationRenderersManager();

// window.addEventListener('piecesLoaded', async ev => {
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     boardView.setOwnerByIndex(3, PieceColor.Blue)
//     await boardView.movePiece(piece1, boardView.getCell(15))
//     boardView.setOwnerByIndex(3)
//     await boardView.movePiece(piece2, boardView.getCell(15));
//     boardView.setOwnerByIndex(1, PieceColor.Red)
//     await boardView.movePiece(piece3, boardView.getCell(15));
//     boardView.setOwnerByIndex(11, PieceColor.Red)
//     await boardView.movePiece(piece4, boardView.getCell(15));
//     boardView.setOwnerByIndex(20, PieceColor.Pink)
//     await boardView.movePiece(piece5, boardView.getCell(15));
//     boardView.setOwnerByIndex(26, PieceColor.Green)
//     await boardView.movePiece(piece6, boardView.getCell(15));
//     boardView.setOwnerByIndex(31, PieceColor.Yellow)
//     await boardView.movePiece(piece7, boardView.getCell(15));
//     boardView.setOwnerByIndex(7, PieceColor.Navyblue)
//     await boardView.movePiece(piece8, boardView.getCell(15));
//     boardView.setOwnerByIndex(1, PieceColor.Red)
// })
