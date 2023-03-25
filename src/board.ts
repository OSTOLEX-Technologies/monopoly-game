import * as THREE from "three";
import {Vector2, Vector3} from "three";
import {PieceMoveAnimationRenderer} from "./animationsRenderers";
import {animationRenderersManager, boardView, keepReactCellsUpdated} from "./viewGlobals";


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
        return this.getCenter3()
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

    public movePiece(piece: PiecePresenter, to: CellPresenter): Promise<void> {
        const from = this.cells.find((cell) => cell.getPieces().indexOf(piece) != -1);
        if (!from) {
            throw new Error("Piece not found on board");
        }
        return new Promise(
            resolve => animationRenderersManager.add(new PieceMoveAnimationRenderer(
            piece,
            from.getPiecePosition(piece),
            to.getCenter3(),
            0.01,
            () => {
                from.removePiece(piece);
                to.setPiece(piece);
                resolve();
            }))
        )

    }
}
