import {keepReactBalanceUpdated, keepReactPropertyUpdated, keepReactPlayersUpdated} from "./decorators";


export class BalanceManager {
    constructor(private balance: number) {
    }

    public getBalance(): number {
        return this.balance;
    }

    @keepReactBalanceUpdated
    public setBalance(balance: number): void {
        if (balance < 0) throw new Error("Balance can't be negative");
        this.balance = balance;
    }
}


export class PropertyManager {
    constructor(private properties: Array<{ logo: string, propertyName: string}> = []) {
    }

    public getProperties(): Array<{logo: string, propertyName: string}> {
        return this.properties;
    }

    @keepReactPropertyUpdated
    public addProperty(property: {logo: string, propertyName: string}): void {
        this.properties.push(property);
    }

    @keepReactPropertyUpdated
    public removeProperty(propertyName: string): void {
        const index = this.properties.findIndex((p) => p.propertyName === propertyName);
        if (index === -1) throw new Error("Property not found");
        this.properties.splice(index, 1);
    }
}

export class PlayersManager {
    constructor(private players: Array<{logo: string, username: string, money: number, color: string}> = []) {}

    public getPlayers(): Array<{logo: string, username: string, money: number, color: string}> {
        return this.players;
    }

    @keepReactPlayersUpdated
    public addPlayer(player: {logo: string, username: string, money: number, color: string}): void {
        this.players.push(player);
    }

    @keepReactPlayersUpdated
    public removePlayer(username: string): void {
        const index = this.players.findIndex((p) => p.username === username);
        if (index === -1) throw new Error("Player not found");
        this.players.splice(index, 1);
    }

}