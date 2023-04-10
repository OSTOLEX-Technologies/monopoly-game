import {Money} from "./Money";
import {useBalance, useHistory, usePlayers, useProperty} from "../../hooks";
import {balanceManager} from "../../viewGlobals";
import {PropertyTable} from "./PropertyTable";
import {PlayersTable} from "./PlayersTable";
import {History} from "./History";

export const UI = () => {
    const balance = useBalance();
    const properties = useProperty();
    const players = usePlayers();
    const history = useHistory();

    return (
        <>
            <Money amount={balance}
                   bankruptHandler={() => balanceManager.setBalance(balanceManager.getBalance() + 10)}
                     tradeHandler={() => balanceManager.setBalance(balanceManager.getBalance() - 10)}
            />
            <PropertyTable properties={properties} />
            <PlayersTable players={players}/>
            <History history={history}/>
        </>
    )
}