import {BoardPresenter} from "./board";
import {AnimationRenderersManager} from "./animationsRenderers";
import {PieceColor} from "./constants";
import {BalanceManager, PlayersManager, PropertyManager} from "./ui_logic";
import {ReactBalanceManager, ReactCellsManager, ReactPlayersManager, ReactPropertyManager} from "./ReactManagers";

export const boardView = new BoardPresenter();
export const balanceManager = new BalanceManager(0);
export const propertyManager = new PropertyManager();
export const playersManager = new PlayersManager();

export const reactCellsManager = new ReactCellsManager();
export const reactBalanceManager = new ReactBalanceManager();
export const reactPropertyManager = new ReactPropertyManager();
export const reactPlayersManager = new ReactPlayersManager();
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://thewiki.io/static/media/sasha_anon.6ba19561.png", propertyName: "1 Ave" })
propertyManager.addProperty({ logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", propertyName: "2 Ave" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "3 Avenue" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })
propertyManager.addProperty({ logo: "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/bafkreic4cq6t7vdose65ekidski2qdafjpouk64h37ihaxwkkp3aflve3m", propertyName: "Hockey Club Manager" })

playersManager.addPlayer({ logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", username: "let45fc.near", money: 1000, color: "red" })
playersManager.addPlayer({ logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", username: "kostup99kastet.testnet", money: 2000, color: "blue" })
playersManager.addPlayer({ logo: "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png", username: "Player3", money: 1500, color: "green" })


const piece1 = boardView.addPiece(0, PieceColor.Blue);
const piece2 = boardView.addPiece(0, PieceColor.Green);
const piece3 = boardView.addPiece(0, PieceColor.Pink);
const piece4 = boardView.addPiece(0, PieceColor.Purple);
const piece5 = boardView.addPiece(0, PieceColor.Red);
const piece6 = boardView.addPiece(0, PieceColor.Yellow);
const piece7 = boardView.addPiece(0, PieceColor.Navyblue);
const piece8 = boardView.addPiece(0, PieceColor.Orange);


export const animationRenderersManager = new AnimationRenderersManager();

// window.addEventListener('piecesLoaded', async ev => {
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     boardView.setOwnerByIndex(3, PieceColor.Blue)
//     await boardView.movePiece(piece1, boardView.getCell(15))
//     boardView.setOwnerByIndex(3)
//     await boardView.movePiece(piece2, boardView.getCell(15));
//     boardView.setOwnerByIndex(1, PieceColor.Red)
//     await boardView.movePiece(piece3, boardView.getCell(15));
//     boardView.setOwnerByIndex(11, PieceColor.Red)
//     await boardView.movePiece(piece4, boardView.getCell(15));
//     boardView.setOwnerByIndex(20, PieceColor.Pink)
//     await boardView.movePiece(piece5, boardView.getCell(15));
//     boardView.setOwnerByIndex(26, PieceColor.Green)
//     await boardView.movePiece(piece6, boardView.getCell(15));
//     boardView.setOwnerByIndex(31, PieceColor.Yellow)
//     await boardView.movePiece(piece7, boardView.getCell(15));
//     boardView.setOwnerByIndex(7, PieceColor.Navyblue)
//     await boardView.movePiece(piece8, boardView.getCell(15));
//     boardView.setOwnerByIndex(1, PieceColor.Red)
// })
