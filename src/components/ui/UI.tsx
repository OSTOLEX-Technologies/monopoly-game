import {Money} from "./Money";
import {useBalance, usePlayers, useProperty} from "../../hooks";
import {balanceManager} from "../../viewGlobals";
import {PropertyTable} from "./PropertyTable";
import {PlayersTable} from "./PlayersTable";

export const UI = () => {
    const balance = useBalance();
    const properties = useProperty();
    const players = usePlayers();

    return (
        <>
            <Money amount={balance}
                   bankruptHandler={() => balanceManager.setBalance(balanceManager.getBalance() + 10)}
                     tradeHandler={() => balanceManager.setBalance(balanceManager.getBalance() - 10)}
            />
            <PropertyTable properties={properties} />
            <PlayersTable players={players}/>
        </>
    )
}