import {keepReactBalanceUpdated, keepReactPropertyUpdated} from "./decorators";


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

    public getProperties(): Array<{ logo: string, propertyName: string}> {
        return this.properties;
    }

    @keepReactPropertyUpdated
    public addProperty(property: { logo: string, propertyName: string}): void {
        this.properties.push(property);
    }

    @keepReactPropertyUpdated
    public removeProperty(property: { logo: string, propertyName: string}): void {
        // search for property by its values
        const index = this.properties.findIndex((p) => p.logo === property.logo && p.propertyName === property.propertyName);
        if (index === -1) throw new Error("Property not found");
        this.properties.splice(index, 1);
    }
}