import {keepReactBalanceUpdated} from "./decorators";


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