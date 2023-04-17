import {Board} from "./Board";
import {Bank} from "./Bank";
import {getTiles} from "./GameConfig";
import {IOffer} from "./Offers/IOffer";
import {GameData} from "../controllers/GameData";
import {Player} from "./Player";

export class Game {
  private board: Board;
  private bank: Bank;

  constructor(data: GameData) {
    const playersInGame = this.getPlayersInGame(data);
    let tiles = getTiles(playersInGame);

    this.bank = new Bank(tiles, playersInGame);
    this.board = new Board(tiles, playersInGame, data.currentPlayerId, this.bank);
  }

  public doStep(playerId: string) {
    return this.board.doStep(playerId);
  }

  private getPlayersInGame(gameData: GameData) {
    let result = new Array<Player>();
    gameData.players.forEach((player) => {
      if (gameData.players_in_game.find((playerId) => playerId == player.id) != undefined) {
        result.push(player);
      }
    });

    return result;
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