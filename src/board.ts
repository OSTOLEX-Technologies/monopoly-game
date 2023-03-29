import * as THREE from "three";
import {Vector2, Vector3} from "three";
import {PieceMoveAnimationRenderer} from "./animationsRenderers";
import {animationRenderersManager, keepReactCellsUpdated} from "./viewGlobals";
import {
    CELLS_ON_BOARD,
    CELLS_ON_SIDE,
    cellsOwnerIcons,
    OwnerIconsTypes,
    PieceColor,
    piecesOnCellOffsets
} from "./constants";


export class PiecePresenter {
    public object3D?: THREE.Object3D;
    public readonly uuid: string;
    constructor(public color: PieceColor) {
        this.uuid = THREE.MathUtils.generateUUID();
    }
}

export class OwnerChipPresenter {
    public object3D?: THREE.Object3D;
    public readonly uuid: string;
    constructor(public color: PieceColor) {
        this.uuid = THREE.MathUtils.generateUUID();
    }
}

export class CellPresenter {
    public index: number;
    private owner?: PieceColor;
    private pieces: Array<PiecePresenter> = [];
    constructor(index: number) {
        if (index < 0 || index > CELLS_ON_BOARD - 1)
            throw new Error("Cell index must be between 0 and 39");
        this.index = index;
    }

    public getOwner(): PieceColor | undefined {
        return this.owner;
    }

    // must be called only through BoardPresenter.setOwner
    public setOwner(owner?: PieceColor): void {
        if (!this.getOwnerChipIcon()) throw new Error("You can't set owner on this cell");
        this.owner = owner;
    }

    public setPiece(piece: PiecePresenter): void {
        this.pieces.push(piece);
    }

    public getPieces(): Array<PiecePresenter> {
        return this.pieces;
    }

    public removePiece(piece: PiecePresenter): void {
        const index = this.pieces.indexOf(piece);
        if (index == -1) {
            throw new Error("Piece not found in cell");
        }
        this.pieces.splice(index, 1);
    }

    public getCenter3(): Vector3 {
        const offset = Math.floor(CELLS_ON_SIDE / 2)
        if (this.index < (CELLS_ON_SIDE - 1)) {
            return new Vector3(this.index - offset, 0, -offset);
        } else if (this.index < (CELLS_ON_SIDE - 1) * 2) {
            return new Vector3(offset, 0, -offset + (this.index - offset * 2));
        } else if (this.index < (CELLS_ON_SIDE - 1) * 3) {
            return new Vector3(offset - (this.index - offset * 4), 0, offset);
        } else {
            return new Vector3(-offset, 0, offset - (this.index - offset * 6));
        }
    }

    public getCenter2(): Vector2 {
        const v3 = this.getCenter3();
        return new Vector2(v3.x, v3.z);
    }

    public getPiecePosition(piece: PiecePresenter): Vector3 {
        if (this.pieces.indexOf(piece) == -1)
            throw new Error("Piece not found in cell");
        if (this.pieces.length > 8)
            throw new Error("Too many pieces on cell");
        // @ts-ignore
        return this.getCenter3().add(piecesOnCellOffsets[this.pieces.length][this.pieces.indexOf(piece)]);
    }

    public getFuturePiecePosition(piece: PiecePresenter): Vector3 {
        if (this.pieces.length + 1 > 8)
            throw new Error("Too many pieces on cell");
        if (this.pieces.indexOf(piece) != -1) {
            // @ts-ignore
            return this.getCenter3().add(piecesOnCellOffsets[this.pieces.length + 1][this.pieces.indexOf(piece)])
        }
        // @ts-ignore
        return this.getCenter3().add(piecesOnCellOffsets[this.pieces.length + 1][this.pieces.length]);
    }

    public getOwnerChipPosition(): Vector3 {
        if (this.index < (CELLS_ON_SIDE - 1)) {
            return this.getCenter3().add(new Vector3(0, 0, 0.55));
        } else if (this.index < (CELLS_ON_SIDE - 1) * 2) {
            return this.getCenter3().add(new Vector3(-0.55, 0, -0.025));
        } else if (this.index < (CELLS_ON_SIDE - 1) * 3) {
            return this.getCenter3().add(new Vector3(0, 0, -0.55));
        } else {
            return this.getCenter3().add(new Vector3(0.55, 0, 0));
        }
    }

    public getOwnerChipPositionTuple(): [number, number, number] {
        const v3 = this.getOwnerChipPosition();
        return [v3.x, v3.y, v3.z];
    }

    public getOwnerChipIcon(): OwnerIconsTypes {
        if (this.index < 0 || this.index > CELLS_ON_BOARD - 1)
            throw new Error("Cell index must be between 0 and 32");
        // @ts-ignore
        return cellsOwnerIcons[this.index];
    }
}

export class BoardPresenter {
    public cells: CellPresenter[];

    constructor() {
        this.cells = Array.from(Array(CELLS_ON_BOARD).keys()).map((i) => new CellPresenter(i));
    }

    @keepReactCellsUpdated
    public setOwner(cell: CellPresenter, owner?: PieceColor): void {
        cell.setOwner(owner);
    }

    @keepReactCellsUpdated
    public setOwnerByIndex(index: number, owner?: PieceColor): void {
        this.setOwner(this.cells[index], owner);
    }

    public getCellByUV(uv: Vector2): CellPresenter | null {
        const col = Math.floor(uv.x * CELLS_ON_SIDE); // counting from right
        const row = Math.floor(uv.y * CELLS_ON_SIDE); // counting from top
        if (row == CELLS_ON_SIDE - 1) { // index between 0 and 8
            return this.cells[col];
        } else if (col == CELLS_ON_SIDE - 1) { // index between 8 and 16
            return this.cells[(CELLS_ON_SIDE - 1) * 2 - row];
        } else if (row == 0) { // index between 16 and 24
            return this.cells[(CELLS_ON_SIDE - 1) * 3 - col];
        } else if (col == 0) { // index between 24 and 31
            return this.cells[(CELLS_ON_SIDE - 1) * 3 + row];
        }
        return null;
    }

    public getCell(index: number): CellPresenter {
        if (index < 0 || index > CELLS_ON_BOARD)
            throw new Error("Cell index must be between 0 and 39");
        return this.cells[index];
    }

    public getPieceCell(piece: PiecePresenter): CellPresenter | null {
        for (const cell of this.cells) {
            if (cell.getPieces().indexOf(piece) != -1) {
                return cell;
            }
        }
        return null;
    }

    @keepReactCellsUpdated
    public addPiece(index: number, color: PieceColor): PiecePresenter {
        const cell = this.getCell(index);
        const piece = new PiecePresenter(color);
        cell.setPiece(piece);
        return piece;
    }

    @keepReactCellsUpdated
    public removePiece(piece: PiecePresenter): void {
        for (const cell of this.cells) {
            if (cell.getPieces().indexOf(piece) != -1) {
                cell.removePiece(piece);
                return;
            }
        }
        throw new Error("Piece not found on board");
    }

    public async movePiece(piece: PiecePresenter, to: CellPresenter) {
        const from = this.getPieceCell(piece);
        if (!from) {
            throw new Error("Piece not found on board");
        }
        if (from == to) {
            return;
        }

        await this.movePieceUp(piece);
        from.removePiece(piece);
        await this.arrangePiecesOnCell(from);

        let newPosition = to.getFuturePiecePosition(piece).add(new Vector3(0, 1, 0));
        await new Promise<void>(
            resolve => animationRenderersManager.add(new PieceMoveAnimationRenderer(
                piece,
                newPosition,
                0.01,
                () => {
                    resolve();
                })));
        await this.arrangePiecesOnCell(to, true)
        to.setPiece(piece);
        await this.movePieceDown(piece);
    }

    private movePieceUp(piece: PiecePresenter): Promise<Vector3> {
        const cell = this.getPieceCell(piece);
        if (!cell) {
            throw new Error("Piece not found on board");
        }
        const futurePosition = cell.getCenter3().add(new Vector3(0, 1, 0));
        return new Promise<Vector3>(
            resolve => animationRenderersManager.add(new PieceMoveAnimationRenderer(
                    piece,
                    futurePosition,
                    0.04,
                    () => {
                        resolve(futurePosition);
                    }))
        )
    }

    private movePieceDown(piece: PiecePresenter): Promise<Vector3> {
        const cell = this.getPieceCell(piece);
        if (!cell) {
            throw new Error("Piece not found on board");
        }
        const futurePosition = cell.getPiecePosition(piece);
        return new Promise<Vector3>(
            resolve => animationRenderersManager.add(new PieceMoveAnimationRenderer(
                    piece,
                    futurePosition,
                    0.04,
                    () => {
                        resolve(futurePosition);
                    }))
        )
    }

    private arrangePiecesOnCell(cell: CellPresenter, futurePositions = false): Promise<void> {
        const pieces = cell.getPieces();
        const promises = [];
        for (const piece of pieces) {
            promises.push(new Promise<void>(
                resolve => animationRenderersManager.add(new PieceMoveAnimationRenderer(
                    piece,
                    futurePositions ? cell.getFuturePiecePosition(piece) : cell.getPiecePosition(piece),
                    0.05,
                    () => {
                        resolve();
                    }))
            ));
        }
        return Promise.all(promises).then(() => {});
    }
}
