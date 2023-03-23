import {Vector2, Vector3} from "three";


class Cell {
    public index: number;
    constructor(index: number) {
        if (index < 0 || index > 39)
            throw new Error("Cell index must be between 0 and 39");
        this.index = index;
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
}

export class BoardView {
    public cells: Cell[];
    constructor() {
        this.cells = Array.from(Array(40).keys()).map((i) => new Cell(i));
    }

    public getCellByUV(uv: Vector2): Cell | null {
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

    public getCell(index: number): Cell {
        if (index < 0 || index > 39)
            throw new Error("Cell index must be between 0 and 39");
        return this.cells[index];
    }
}
