import {GameData} from "./GameData";
import {Game} from "../game/Game";
import {handleActions} from "./handleActions";
import {PiecePresenter} from "../board";
import {balanceManager, boardView, playersManager, propertyManager} from "../viewGlobals";
import {getPieceColor} from "../game/Utils";
import {Player} from "../game/Player";
import {PropertyStatus} from "../constants";
import {Action} from "../game/Actions/Action";

export class GameController {
  private game: Game;
  private readonly playerId: string;
  private pieces: Map<string, PiecePresenter>;

  constructor(data: GameData, playerId: string) {
    this.game = new Game(data);
    this.playerId = playerId;
    this.pieces = new Map<string, PiecePresenter>();

    this.initGame(data);
  }

  private initGame(data: GameData) {
    data.players.forEach((player) => {
      this.initPiece(player);
    });

    this.initBalance();
    this.initProperty();
    this.initPlayers();
  }

  private initPiece(player: Player) {
    const piece = boardView.addPiece(player.getPosition(), getPieceColor(player.color));
    this.pieces.set(player.getId(), piece);
  }

  private initBalance() {
    const playerBalance = this.game.getPlayerBalance(this.playerId);
    balanceManager.setBalance(playerBalance);
  }

  private initProperty() {
    const playerProperties = this.game.getProperties(this.playerId);
    playerProperties.forEach((property) => {
      propertyManager.addProperty({
        logo: property.logo,
        propertyName: property.getTitle(),
        status: property.isMortgage ? PropertyStatus.Redeem : PropertyStatus.Mortgage,
        buttonCallback: () => {
          // TODO:
        }
      });
    });
  }

  private redeem(playerId: string, cardId: string) {
    this.game.redeem(playerId, cardId);
  }

  private mortgage(playerId: string, cardId: string) {
    this.game.mortgage(playerId, cardId);
  }

  private initPlayers() {
    const players = this.game.getPlayers();

    players.forEach((player) => {
      playersManager.addPlayer({
        logo: player.color,
        username: player.id,
        money: player.getBalance(),
        color: player.color,
      });
    });
  }

  public async makeMove() {
    const actions = this.game.doStep(this.playerId);
    await this.displayMove(this.playerId, actions);
  }

  private async displayMove(playerId: string, actions: Array<Action>) {
    const piece = this.pieces.get(playerId);

    if (piece == undefined) {
      throw new Error("Cannot find piece");
    }

    await handleActions(actions, piece, playerId);
  }

  public async makeOpponentMove(gameData: GameData, opponentId: string) {
    this.game = new Game(gameData);
    await this.displayMove(opponentId, gameData.lastActions);
  }

  public showLastTransaction() {
  }
}