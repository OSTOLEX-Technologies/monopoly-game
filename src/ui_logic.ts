import {
    keepReactBalanceUpdated,
    keepReactPropertyUpdated,
    keepReactPlayersUpdated,
    keepReactHistoryUpdated
} from "./decorators";
import {PropertyStatus} from "./constants";
import {playIncomeSound, playRentTaxFinesSound} from "./utils";


export class BalanceManager {
    private bankruptListeners: Array<() => void> = [];
    private tradeListeners: Array<() => void> = [];
    constructor(private balance: number) {
    }

    public getBalance(): number {
        return this.balance;
    }

    @keepReactBalanceUpdated
    public setBalance(balance: number): void {
        if (balance < 0) throw new Error("Balance can't be negative");
        if (balance > this.balance)
            playIncomeSound()
        else if (balance < this.balance)
            playRentTaxFinesSound()
        this.balance = balance;
    }

    /*
    * This method is used to add a listener to the balance change event
    * @param eventName - the name of the event. Available events: "bankrupt", "trade"
    * */
    public addEventListener(eventName: string, listener: () => void): void {
        if (eventName === "bankrupt") {
            this.bankruptListeners.push(listener);
        } else if (eventName === "trade") {
            this.tradeListeners.push(listener);
        }
    }

    public dispatchEvent(eventName: string): void {
        if (eventName === "bankrupt") {
            for (const listener of this.bankruptListeners) {
                listener();
            }
        } else if (eventName === "trade") {
            for (const listener of this.tradeListeners) {
                listener();
            }
        }
    }
}


export class PropertyManager {
    constructor(private properties: Array<{ logo: string, propertyName: string, status: PropertyStatus, buttonCallback: () => void}> = []) {}

    public getProperties(): Array<{logo: string, propertyName: string, status: PropertyStatus, buttonCallback: () => void}> {
        return this.properties;
    }

    @keepReactPropertyUpdated
    public addProperty(property: {logo: string, propertyName: string, status: PropertyStatus, buttonCallback: () => void}): void {
        this.properties.push(property);
    }

    @keepReactPropertyUpdated
    public updateProperty(propertyName: string, status?: PropertyStatus, buttonCallback?: () => void): void {
        const index = this.properties.findIndex((p) => p.propertyName === propertyName);
        if (index === -1) throw new Error("Property not found");
        if (status)
            this.properties[index].status = status;
        if (buttonCallback)
            this.properties[index].buttonCallback = buttonCallback;
    }

    @keepReactPropertyUpdated
    public removeProperty(propertyName: string): void {
        const index = this.properties.findIndex((p) => p.propertyName === propertyName);
        if (index === -1) throw new Error("Property not found");
        this.properties.splice(index, 1);
    }
}

export class PlayersManager {
    constructor(private players: Array<{logo: string, username: string, money: number, color: string, onKick: () => void}> = []) {}

    public getPlayers(): Array<{logo: string, username: string, money: number, color: string, onKick: () => void}> {
        return this.players;
    }

    @keepReactPlayersUpdated
    public addPlayer(player: {logo: string, username: string, money: number, color: string, onKick: () => void}): void {
        this.players.push(player);
    }

    @keepReactPlayersUpdated
    public removePlayer(username: string): void {
        const index = this.players.findIndex((p) => p.username === username);
        if (index === -1) throw new Error("Player not found");
        this.players.splice(index, 1);
    }

}

export class GameHistoryManager {
    constructor(private history: Array<string> = []) {}

    public getHistory(): Array<string> {
        return this.history;
    }

    @keepReactHistoryUpdated
    public addHistoryMessage(message: string): void {
        this.history.push(message);
    }
}