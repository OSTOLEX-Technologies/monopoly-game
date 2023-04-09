import {Money} from "./Money";
import {useBalance, useProperty} from "../../hooks";
import {balanceManager} from "../../viewGlobals";
import {PropertyTable} from "./PropertyTable";

export const UI = () => {
    const balance = useBalance();
    const properties = useProperty();
    return (
        <>
            <Money amount={balance}
                   bankruptHandler={() => balanceManager.setBalance(balanceManager.getBalance() + 10)}
                     tradeHandler={() => balanceManager.setBalance(balanceManager.getBalance() - 10)}
            />
            <PropertyTable properties={properties} />
        </>
    )
}