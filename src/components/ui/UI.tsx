import {Money} from "./Money";
import {useBalance} from "../../hooks";
import {balanceManager} from "../../viewGlobals";

export const UI = () => {
    const balance = useBalance();
    return (
        <>
            <Money amount={balance}
                   bankruptHandler={() => balanceManager.setBalance(balanceManager.getBalance() + 10)}
                     tradeHandler={() => balanceManager.setBalance(balanceManager.getBalance() - 10)}
            />
        </>
    )
}