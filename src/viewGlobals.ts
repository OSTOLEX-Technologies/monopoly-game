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

const piece = boardView.addPiece(0, PieceColor.Blue);
boardView.addPiece(1, PieceColor.Green);
boardView.addPiece(2, PieceColor.Pink);
boardView.addPiece(3, PieceColor.Purple);
boardView.addPiece(4, PieceColor.White);
boardView.addPiece(5, PieceColor.Yellow);
boardView.addPiece(6, PieceColor.Navyblue);
boardView.addPiece(7, PieceColor.Orange);


export const animationRenderersManager = new AnimationRenderersManager();

boardView.movePiece(piece, boardView.getCell(4)).then(() => {
    setTimeout(async () => {
        await boardView.movePiece(piece, boardView.getCell(10));
        boardView.removePiece(piece);
        const newPiece = boardView.getCell(1).getPieces()[0];
        console.log(newPiece)
        await boardView.movePiece(newPiece, boardView.getCell(10));
        await boardView.movePiece(newPiece, boardView.getCell(15));
        boardView.removePiece(newPiece);
    }, 1000);
});
