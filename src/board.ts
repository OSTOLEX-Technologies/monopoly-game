import * as THREE from "three";
import {Vector2, Vector3} from "three";
import {PieceMoveAnimationRenderer} from "./animationsRenderers";
import {animationRenderersManager, boardView, keepReactCellsUpdated} from "./viewGlobals";


const piecesOnCellOffsets = Object.freeze({
    1: [
        new Vector3(0, 0, 0),
    ],
    2: [
        new Vector3(0, 0, 0.25),
        new Vector3(0, 0, -0.25)
    ],
    3: [
        new Vector3(-0.25, 0, 0.25),
        new Vector3(0.25, 0, 0),
        new Vector3(-0.25, 0, -0.25),
    ],
    4: [
        new Vector3(-0.25, 0, 0.25),
        new Vector3(0.25, 0, 0.25),
        new Vector3(-0.25, 0, -0.25),
        new Vector3(0.25, 0, -0.25),
    ],
    5: [
        new Vector3(-0.25, 0, 0.25),
        new Vector3(0.25, 0, 0.25),
        new Vector3(-0.25, 0, -0.25),
        new Vector3(0.25, 0, -0.25),
        new Vector3(0, 0, 0),
    ],
    6: [
        new Vector3(0.17, 0, 0.275),
        new Vector3(0.3, 0, 0),
        new Vector3(0.17, 0, -0.275),
        new Vector3(-0.17, 0, 0.275),
        new Vector3(-0.3, 0, 0),
        new Vector3(-0.17, 0, -0.275),
    ],
    7: [
        new Vector3(0.155, 0, 0.275),
        new Vector3(0.3, 0, 0),
        new Vector3(0.155, 0, -0.275),
        new Vector3(-0.155, 0, 0.275),
        new Vector3(-0.3, 0, 0),
        new Vector3(-0.155, 0, -0.275),
        new Vector3(0, 0, 0),
    ],
    8: [
        new Vector3(0.3, 0, 0.3),
        new Vector3(0.3, 0, 0),
        new Vector3(0.3, 0, -0.3),
        new Vector3(0, 0, -0.3),
        new Vector3(-0.3, 0, -0.3),
        new Vector3(-0.3, 0, 0),
        new Vector3(-0.3, 0, 0.3),
        new Vector3(0, 0, 0.3),
    ]
})


export enum PieceColor {
    Pink = "pink",
    Purple = "purple",
    Green = "green",
    Yellow = "yellow",
    Blue = "blue",
    Orange = "orange",
    Navyblue = "navyblue",
    White = "white",
}

export class PiecePresenter {
    public object3D?: THREE.Object3D;
    public readonly uuid: string;
    constructor(public color: PieceColor) {
        this.uuid = THREE.MathUtils.generateUUID();
    }
}

export class CellPresenter {
    public index: number;
    private pieces: Array<PiecePresenter> = [];
    constructor(index: number) {
        if (index < 0 || index > 39)
            throw new Error("Cell index must be between 0 and 39");
        this.index = index;
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
        if (this.index < 10) {
            return new Vector3(this.index - 5, 0, -5);
        } else if (this.index < 20) {
            return new Vector3(5, 0, -5 + (this.index - 10));
        } else if (this.index < 30) {
            return new Vector3(5 - (this.index - 20), 0, 5);
        } else {
            return new Vector3(-5, 0, 5 - (this.index - 30));
        }
    }

    public getCenter2(): Vector2 {
        const v3 = this.getCenter3();
        return new Vector2(v3.x, v3.z);
    }

    public getBounds2(): Vector2[] {
        // returns right top corner and left bottom corner
        const center = this.getCenter2();
        return [
            new Vector2(center.x - 0.5, center.y - 0.5),
            new Vector2(center.x + 0.5, center.y + 0.5),
        ];
    }

    public getBounds3(): Vector3[] {
        // returns right top corner and left bottom corner
        const center = this.getCenter3();
        return [
            new Vector3(center.x - 0.5, center.y, center.z - 0.5),
            new Vector3(center.x + 0.5, center.y, center.z + 0.5),
        ];
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
}

export class BoardPresenter {
    public cells: CellPresenter[];

    constructor() {
        this.cells = Array.from(Array(40).keys()).map((i) => new CellPresenter(i));
    }

    public getCellByUV(uv: Vector2): CellPresenter | null {
        const col = Math.floor(uv.x * 11); // counting from right
        const row = Math.floor(uv.y * 11); // counting from top
        if (row == 10) { // index between 0 and 10
            return this.cells[col];
        } else if (col == 10) { // index between 10 and 20
            return this.cells[20 - row];
        } else if (row == 0) { // index between 20 and 30
            return this.cells[30 - col];
        } else if (col == 0) { // index between 30 and 39
            return this.cells[30 + row];
        }
        return null;
    }

    public getCell(index: number): CellPresenter {
        if (index < 0 || index > 39)
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
