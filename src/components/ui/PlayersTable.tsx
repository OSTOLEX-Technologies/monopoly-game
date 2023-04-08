import {GameController} from "../../controllers/GameController";
import {useEffect, useState} from "react";
import {Player} from "../../game/Player";

const smallButtonStyle = {
    backgroundImage: `url("https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/vault/button%20small.png")`,
    color: "#fff",
    fontFamily: "Orbitron",
    fontSize: "16px",
    height: "43px",
    width: "151px",
    padding: 0,
    border: 0,
    outline: "none",
    cursor: "pointer",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const rowStyle = {
    fontFamily: "Orbitron",
    fontSize: "24px",
    display: "flex",
    gap: "20px",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
};

const PlayerRow = (username: string, money: number, color: string) => (
    <div key={username} style={{ ...rowStyle, color: color }}>
        <span>{username}</span>
        <span>{money}</span>
        <button style={smallButtonStyle}>
            <p style={{ paddingTop: "5px" }}>Vote-kick</p>
        </button>
    </div>
);

export const PlayersTable = (controller: GameController) => {
    const [players, setPlayers] = useState<Array<Player>>();

    useEffect(() => {
        setPlayers(controller.getPlayers());
    }, [controller.getPlayers()]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <div>
                {players!.map((player) =>
                    PlayerRow(player.id, player.getBalance(), player.color)
                )}
            </div>
        </div>
    );
}