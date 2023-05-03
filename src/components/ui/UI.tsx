import {Money} from "./Money";
import {useBalance, useHistory, usePlayers, useProperty} from "../../hooks";
import {balanceManager} from "../../viewGlobals";
import {PropertyTable} from "./PropertyTable";
import {PlayersTable} from "./PlayersTable";
import {History} from "./History";
import {CardPopup} from "./CardPopup";
import {CardType} from "../../constants";
import {Sound} from "./Sound";

export const UI = () => {
    const [balance, bankruptHandler, tradeHandler] = useBalance();
    const properties = useProperty();
    const players = usePlayers();
    const history = useHistory();

    return (
        <>
            <div>
                <PlayersTable players={players}/>
                <History history={history}/>
            </div>
            <div>
            <Sound/>
            <Money amount={balance}
                   bankruptHandler={bankruptHandler}
                   tradeHandler={tradeHandler}
            />
            <PropertyTable properties={properties} />
            </div>

        </>
    )
}