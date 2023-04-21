import {Money} from "./Money";
import {useBalance, useHistory, usePlayers, useProperty} from "../../hooks";
import {balanceManager} from "../../viewGlobals";
import {PropertyTable} from "./PropertyTable";
import {PlayersTable} from "./PlayersTable";
import {History} from "./History";
import {CardPopup} from "./CardPopup";
import {CardType} from "../../constants";

export const UI = () => {
    const [balance, bankruptHandler, tradeHandler] = useBalance();
    const properties = useProperty();
    const players = usePlayers();
    const history = useHistory();

    return (
        <>
            <Money amount={balance}
                   bankruptHandler={bankruptHandler}
                   tradeHandler={tradeHandler}
            />
            <PropertyTable properties={properties} />
            <PlayersTable players={players}/>
            <History history={history}/>
        </>
    )
}