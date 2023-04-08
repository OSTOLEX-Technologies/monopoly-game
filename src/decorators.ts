import {BoardPresenter} from "./board";
import {boardView, reactCellsManager, reactBalanceManager, balanceManager} from "./viewGlobals";

export function keepReactCellsUpdated(target: BoardPresenter, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = (...args: any[]) => {
        const toReturn = originalMethod.call(boardView, ...args);
        for (const handler of reactCellsManager.setCellsHandlers) {
            handler([...boardView.cells])
        }
        return toReturn;
    }
    return descriptor
}

export function keepReactBalanceUpdated(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = (...args: any[]) => {
        const toReturn = originalMethod.call(balanceManager, ...args);
        for (const handler of reactBalanceManager.setBalanceHandlers) {
            handler(balanceManager.getBalance())
        }
        return toReturn;
    }
    return descriptor
}