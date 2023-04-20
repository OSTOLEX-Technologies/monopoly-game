import {BoardPresenter} from "./board";
import {AnimationRenderersManager} from "./animationsRenderers";
import {CellPriceType, PieceColor, PropertyStatus} from "./constants";
import {BalanceManager, GameHistoryManager, PlayersManager, PropertyManager} from "./ui_logic";
import {
        ReactBalanceManager,
        ReactCellInfoPopupManager,
        ReactCellsManager,
        ReactChanceCardsManager,
        ReactGameHistoryManager,
        ReactModalPopupManager,
        ReactPlayersManager,
        ReactPropertyManager,
        ReactTreasuryCardsManager
} from "./ReactManagers";
import {GameController} from "./controllers/GameController";
import {GameData} from "./controllers/GameData";
import {Player} from "./game/Player";
import {IOffer} from "./game/Offers/IOffer";
import {Action} from "./game/Actions/Action";
import {Transaction} from "./game/Offers/Transaction";

export const boardView = new BoardPresenter();
export const balanceManager = new BalanceManager(0);
export const propertyManager = new PropertyManager();
export const playersManager = new PlayersManager();
export const gameHistoryManager = new GameHistoryManager();

export const animationRenderersManager = new AnimationRenderersManager();

export const reactCellsManager = new ReactCellsManager();
export const reactBalanceManager = new ReactBalanceManager();
export const reactPropertyManager = new ReactPropertyManager();
export const reactPlayersManager = new ReactPlayersManager();
export const reactGameHistoryManager = new ReactGameHistoryManager();
export const reactChanceCardsManager = new ReactChanceCardsManager();
export const reactTreasuryCardsManager = new ReactTreasuryCardsManager();
export const reactModalPopupManager = new ReactModalPopupManager();
export const reactCellInfoPopupManager = new ReactCellInfoPopupManager();

balanceManager.addEventListener("bankrupt", () => {
        balanceManager.setBalance(balanceManager.getBalance() + 10);
})
balanceManager.addEventListener("trade", () => {
        balanceManager.setBalance(balanceManager.getBalance() - 10);
})

propertyManager.addProperty({logo: "https://i.near.social/thumbnail/https://thewiki.io/static/media/sasha_anon.6ba19561.png", propertyName: "1 Ave", status: PropertyStatus.Mortgage, buttonCallback: () => {console.log("mortgage")}});
propertyManager.addProperty({logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", propertyName: "2 Ave", status: PropertyStatus.Mortgage, buttonCallback: () => {console.log("mortgage")}})

playersManager.addPlayer({logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", username: "let45fc.testnet", money: 1000, color: "red"})
playersManager.addPlayer({logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", username: "kostup99kastet.testnet", money: 2000, color: "blue"})
playersManager.addPlayer({logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", username: "Player3", money: 1500, color: "green"})


const piece1 = boardView.addPiece(0, PieceColor.Blue);
const piece2 = boardView.addPiece(0, PieceColor.Green);
const piece3 = boardView.addPiece(0, PieceColor.Pink);
const piece4 = boardView.addPiece(0, PieceColor.Purple);
const piece5 = boardView.addPiece(0, PieceColor.Red);
const piece6 = boardView.addPiece(0, PieceColor.Yellow);
const piece7 = boardView.addPiece(0, PieceColor.Navyblue);
const piece8 = boardView.addPiece(0, PieceColor.Orange);

boardView.setCellPrice(31, 2000)
boardView.setCellPriceType(31, CellPriceType.Fee)


const messages = [
        "(red).{let45fc.testnet} sent 300$ to (green).{Player3}",
        "(red).{let45fc.testnet} bought a house on Avenue de la République for 200$",
        "You are bankrupt!",
        "(blue).{johndoe} traded 150$ with (purple).{janedoe}",
        "(green).{sarahsmith} sold 3 shares of AAPL for 500$ to (red).{mikewilliams}",
        "(orange).{samjones} bought a car for 1000$ from (green).{amythompson}",
        "(purple).{davidsmith} sent 75$ to (blue).{peterlee}",
        "(red).{sarahkim} traded 200$ with (blue).{danielbrown}",
        "(green).{katiebaker} sold 5 shares of AMZN for 1000$ to (orange).{johndoe}",
        "(blue).{markjones} bought a bike for 300$ from (purple).{mikejohnson}",
        "(orange).{lindadavis} sent 50$ to (green).{karenwilson}",
        "(purple).{robertmoore} traded 100$ with (red).{jimmykim}",
        "(blue).{jessicawilliams} bought a watch for 150$ from (green).{sarahlee}",
        "(green).{taylorharris} sold 2 shares of TSLA for 600$ to (red).{harrybrown}",
        "(red).{johnsmith} sent 25$ to (blue).{michellelee}",
        "(purple).{kevinjones} traded 300$ with (orange).{julielee}",
        "(blue).{hannahbrown} bought a camera for 400$ from (green).{lucaswilson}",
        "(orange).{sophieturner} sold 4 shares of FB for 800$ to (purple).{stevenjones}",
        "(green).{liuyang} sent 150$ to (red).{maxwelltaylor}",
        "(red).{emilynguyen} traded 50$ with (blue).{davidwilson}",
];

for (let i = 0; i < messages.length; i++) {
    gameHistoryManager.addHistoryMessage(messages[i]);
}

window.addEventListener('piecesLoaded', async ev => {
        // setTimeout(() => reactChanceCardsManager.showCard("Example treasury card"), 2000);
        // setTimeout(() => reactModalPopupManager.showPopup({
        //         message: "If you go bankrupt, you will lose a game. Are you going bankrupt?",
        //         yesCallback: () => {
        //                 console.log("Yes");
        //         },
        //         noCallback: () => {
        //                 console.log("No");
        //         },
        //         yesText: "Hello",
        //         noText: "Cancel"
        // }), 2000);
        // setTimeout(() => propertyManager.updateProperty("1 Ave", PropertyStatus.Redeem,
        //     () => {console.log("Property redeemed")}), 2000);
});

const gameData = new GameData(
    new Array<Player>(),
    "",
    new Array<IOffer>(),
    new Array<Transaction>(),
    new Array<Action>(),
    new Map<string, number>,
    new Map<string, Array<string>>,
    new Array<string>(),
);
const playerId = "";

export const gameController = new GameController(gameData, playerId);

window.addEventListener('message', async (event) => {
        const type = event.data.type;
        const data = event.data.data;

        switch (type) {
                case "kick":
                        break;
                case "bankrupt":
                        break;
                case "move":
                        break;
                case "endOfTurn":
                        break;
                case "trade":
                        break;
        }
});

// window.addEventListener('piecesLoaded', async ev => {
//         await boardView.movePieceToJail(piece1);
//         await boardView.movePieceToJail(piece2);
//         await boardView.movePieceToJail(piece3);
//         await boardView.movePieceToJail(piece4);
//         await boardView.movePieceToJail(piece5);
//         await boardView.movePieceToJail(piece6);
//         await boardView.movePieceToJail(piece7);
//         await boardView.movePieceToJail(piece8);
//         await boardView.movePieceFromJail(piece1);
//         await boardView.movePieceFromJail(piece2);
//         await boardView.movePieceFromJail(piece3);
//         await boardView.movePieceFromJail(piece4);
// })

// window.addEventListener('piecesLoaded', async ev => {
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     boardView.setOwnerByIndex(3, PieceColor.Blue);
//     gameHistoryManager.addHistoryMessage(messages[0]);
//     await boardView.movePieceToCell(piece1, boardView.getCell(15));
//     boardView.setOwnerByIndex(3);
//     gameHistoryManager.addHistoryMessage(messages[1]);
//     await boardView.movePieceToCell(piece2, boardView.getCell(15));
//     boardView.setOwnerByIndex(1, PieceColor.Red);
//     gameHistoryManager.addHistoryMessage(messages[2]);
//     await boardView.movePieceToCell(piece3, boardView.getCell(15));
//     boardView.setOwnerByIndex(11, PieceColor.Red);
//     gameHistoryManager.addHistoryMessage(messages[3]);
//     await boardView.movePieceToCell(piece4, boardView.getCell(15));
//     boardView.setOwnerByIndex(20, PieceColor.Pink);
//     gameHistoryManager.addHistoryMessage(messages[4]);
//     await boardView.movePieceToCell(piece5, boardView.getCell(15));
//     boardView.setOwnerByIndex(26, PieceColor.Green);
//     gameHistoryManager.addHistoryMessage(messages[5]);
//     await boardView.movePieceToCell(piece6, boardView.getCell(15));
//     boardView.setOwnerByIndex(31, PieceColor.Yellow);
//     gameHistoryManager.addHistoryMessage(messages[6]);
//     await boardView.movePieceToCell(piece7, boardView.getCell(15));
//     boardView.setOwnerByIndex(7, PieceColor.Navyblue);
//     gameHistoryManager.addHistoryMessage(messages[7]);
//     await boardView.movePieceToCell(piece8, boardView.getCell(15));
//     boardView.setOwnerByIndex(1, PieceColor.Red);
//     gameHistoryManager.addHistoryMessage(messages[8]);
//     for (let i = 9; i < messages.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         gameHistoryManager.addHistoryMessage(messages[i]);
//     }
// })
