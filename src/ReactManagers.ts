import {CellPresenter} from "./board";

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

export class ReactBalanceManager {
    public setBalanceHandlers: Array<(balance: number) => void> = [];

    public onSetBalance(handler: (balance: number) => void): void {
        this.setBalanceHandlers.push(handler);
    }

    public unSetBalance(handler: (balance: number) => void): void {
        const index = this.setBalanceHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setBalanceHandlers.splice(index, 1);
    }
}

export class ReactPropertyManager {
    public setPropertyHandlers: Array<(property: Array<{ logo: string, propertyName: string}>) => void> = [];

    public onSetProperty(handler: (property: Array<{ logo: string, propertyName: string}>) => void): void {
        this.setPropertyHandlers.push(handler);
    }

    public unSetProperty(handler: (property: Array<{ logo: string, propertyName: string}>) => void): void {
        const index = this.setPropertyHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setPropertyHandlers.splice(index, 1);
    }
}