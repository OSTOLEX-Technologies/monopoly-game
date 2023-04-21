import {CellPresenter} from "./board";
import {PropertyStatus} from "./constants";
import {playChanceOrTreasurySound} from "./utils";

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
    public setPropertyHandlers: Array<(property: Array<{ logo: string, propertyName: string, status: PropertyStatus, buttonCallback: () => void}>) => void> = [];

    public onSetProperty(handler: (property: Array<{ logo: string, propertyName: string, status: PropertyStatus, buttonCallback: () => void}>) => void): void {
        this.setPropertyHandlers.push(handler);
    }

    public unSetProperty(handler: (property: Array<{ logo: string, propertyName: string, status: PropertyStatus, buttonCallback: () => void}>) => void): void {
        const index = this.setPropertyHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setPropertyHandlers.splice(index, 1);
    }
}

export class ReactPlayersManager {
    public setPlayersHandlers: Array<(players: Array<{ logo: string, username: string, money: number, color: string, onKick: () => void}>) => void> = [];

    public onSetPlayers(handler: (players: Array<{ logo: string, username: string, money: number, color: string, onKick: () => void }>) => void): void {
        this.setPlayersHandlers.push(handler);
    }

    public unSetPlayers(handler: (players: Array<{ logo: string, username: string, money: number, color: string, onKick: () => void }>) => void): void {
        const index = this.setPlayersHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setPlayersHandlers.splice(index, 1);
    }
}

export class ReactGameHistoryManager {
    // history message is a string in format  "(red).{let45fc.testnet} sent 300$ to (green).{Player3}"
    public setGameHistoryHandlers: Array<(history: Array<string>) => void> = [];

    public onSetGameHistory(handler: (history: Array<string>) => void): void {
        this.setGameHistoryHandlers.push(handler);
    }

    public unSetGameHistory(handler: (history: Array<string>) => void): void {
        const index = this.setGameHistoryHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setGameHistoryHandlers.splice(index, 1);
    }
}

export class ReactChanceCardsManager {
    public setChanceCardHandlers: Array<(description: string) => void> = [];

    public onSetChanceCard(handler: (description: string) => void): void {
        this.setChanceCardHandlers.push(handler);
    }

    public unSetChanceCard(handler: (description: string) => void): void {
        const index = this.setChanceCardHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setChanceCardHandlers.splice(index, 1);
    }

    public showCard(description: string): void {
        this.setChanceCardHandlers.forEach((handler) => handler(description));
        playChanceOrTreasurySound();
    }
}


export class ReactTreasuryCardsManager {
    public setTreasuryCardHandlers: Array<(description: string) => void> = [];

    public onSetTreasuryCard(handler: (description: string) => void): void {
        this.setTreasuryCardHandlers.push(handler);
    }

    public unSetTreasuryCard(handler: (description: string) => void): void {
        const index = this.setTreasuryCardHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setTreasuryCardHandlers.splice(index, 1);
    }

    public showCard(description: string): void {
        this.setTreasuryCardHandlers.forEach((handler) => handler(description));
        playChanceOrTreasurySound();
    }
}

export type ModalPopupData = {
    message: string;
    yesCallback: () => void;
    noCallback: () => void;
    yesText: string;
    noText: string;
}

export class ReactModalPopupManager {
    public setModalPopupHandlers: Array<(data: ModalPopupData) => void> = [];

    public onSetModalPopup(handler: (data: ModalPopupData) => void): void {
        this.setModalPopupHandlers.push(handler);
    }

    public unSetModalPopup(handler: (data: ModalPopupData) => void): void {
        const index = this.setModalPopupHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setModalPopupHandlers.splice(index, 1);
    }

    public showPopup(data: ModalPopupData ): void {
        this.setModalPopupHandlers.forEach((handler) => handler(data));
        // playChanceOrTreasurySound();
    }
}

export interface CellInfoPopupData {
    header: string;
    price?: number;
    link?: string;
    description: string;
    logo: string;
    owner?: string;
    categoryImg?: string;
    housePrice?: number;
    hotelPrice?: number;
    mortgagePrice?: number;
    stages?: Array<string>;
    prices?: Array<string>;
    currentStage?: number;
}

export class ReactCellInfoPopupManager {
    public setCellInfoPopupDataHandlers: Array<(data: CellInfoPopupData) => void> = [];
    public setCellInfoShowHandlers: Array<(show: boolean) => void> = [];
    private showPopupTimeout?: NodeJS.Timeout;
    private hidePopupTimeout?: NodeJS.Timeout;

    public onCellInfoPopup(handler: (data: CellInfoPopupData) => void): void {
        this.setCellInfoPopupDataHandlers.push(handler);
    }

    public onCellInfoShow(handler: (show: boolean) => void): void {
        this.setCellInfoShowHandlers.push(handler);
    }

    public unCellInfoPopup(handler: (data: CellInfoPopupData) => void): void {
        const index = this.setCellInfoPopupDataHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setCellInfoPopupDataHandlers.splice(index, 1);
    }

    public unCellInfoShow(handler: (show: boolean) => void): void {
        const index = this.setCellInfoShowHandlers.indexOf(handler);
        if (index == -1)
            throw new Error("Handler not found");
        this.setCellInfoShowHandlers.splice(index, 1);
    }

    public showPopupWithDelay(data: CellInfoPopupData, delay: number): NodeJS.Timeout {
        clearTimeout(this.hidePopupTimeout);
        clearTimeout(this.showPopupTimeout);
        this.showPopupTimeout = setTimeout(() => this.showPopup(data), delay);
        return this.showPopupTimeout;
    }

    public hidePopupWithDelay(delay: number): NodeJS.Timeout {
        clearTimeout(this.showPopupTimeout);
        clearTimeout(this.hidePopupTimeout);
        this.hidePopupTimeout = setTimeout(() => this.hidePopup(), delay);
        return this.hidePopupTimeout;
    }

    public cancelShowPopup(): void {
        clearTimeout(this.showPopupTimeout);
    }

    public cancelHidePopup(): void {
        clearTimeout(this.hidePopupTimeout);
    }

    public showPopup(data: CellInfoPopupData): void {
        this.setCellInfoPopupDataHandlers.forEach((handler) => handler(data));
        this.setCellInfoShowHandlers.forEach((handler) => handler(true));
    }

    public hidePopup(): void {
        this.setCellInfoShowHandlers.forEach((handler) => handler(false));
    }
}
