import {Board} from "./Board";
import {Bank} from "./Bank";
import {getTiles} from "./GameConfig";
import {Action} from "./Actions/Action";
import {IOffer} from "./Offers/IOffer";
import {GameData} from "../controllers/GameData";

export class Game {
  private board: Board;
  private bank: Bank;
  private currentDice: Array<number> | null;

  constructor(data: GameData) {
    let tiles = getTiles(data.players);

    this.bank = new Bank(tiles, data.players);
    this.board = new Board(tiles, data.players, data.currentPlayerId, this.bank);
    this.currentDice = null;
  }

  public doStep(playerId: string) {
    return this.board.doStep(playerId);
  }

  public mortgage(playerId: string, cardId: string) {
    this.bank.mortgage(playerId, cardId);
  }

  public redeem(playerId: string, cardId: string) {
    this.bank.redeem(playerId, cardId);
  }

  public useJailFreeCard(playerId: string) {
    this.board.useJailFreeCard(playerId);
  }

  public applyOffer(transaction: IOffer) {}

  public checkOffer(offer: IOffer) {}

  public getPlayers() {
    return this.board.players;
  }

  public getCardsInBank() {}

  public getTiles() {}

  public getPlayerBalance(playerId: string) {
    return this.bank.getBalance(playerId);
  }

  public getProperties(playerId: string) {
    return this.board.getPlayerProperties(playerId);
  }
}