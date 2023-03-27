import {BoardPresenter, CellPresenter, PieceColor} from "./board";
import {AnimationRenderersManager} from "./animationsRenderers";

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
const piece2 = boardView.addPiece(1, PieceColor.Green);
const piece3 = boardView.addPiece(2, PieceColor.Pink);
const piece4 = boardView.addPiece(3, PieceColor.Purple);
const piece5 = boardView.addPiece(4, PieceColor.LightPink);
const piece6 = boardView.addPiece(5, PieceColor.Yellow);
const piece7 = boardView.addPiece(6, PieceColor.Navyblue);
const piece8 = boardView.addPiece(7, PieceColor.Orange);


export const animationRenderersManager = new AnimationRenderersManager();

// window.addEventListener('piecesLoaded', async ev => {
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     await boardView.movePiece(piece1, boardView.getCell(15))
//     await boardView.movePiece(piece2, boardView.getCell(15));
//     await boardView.movePiece(piece3, boardView.getCell(15));
//     await boardView.movePiece(piece4, boardView.getCell(15));
//     await boardView.movePiece(piece5, boardView.getCell(15));
//     await boardView.movePiece(piece6, boardView.getCell(15));
//     await boardView.movePiece(piece7, boardView.getCell(15));
//     await boardView.movePiece(piece8, boardView.getCell(15));
// })
