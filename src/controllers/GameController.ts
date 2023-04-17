import {GameData} from "./GameData";
import {Game} from "../game/Game";
import {handleActions} from "./handleActions";
import {PiecePresenter} from "../board";
import {balanceManager, boardView, propertyManager} from "../viewGlobals";
import {getPieceColor} from "../game/Utils";
import {Player} from "../game/Player";
import {PropertyStatus} from "../constants";

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
        status: property.isMortgage ? PropertyStatus.Mortgage : PropertyStatus.Redeem,
        buttonCallback: () => {}
      });
    });
  }

  public getPlayers() {
    return this.game.getPlayers();
  }

  public async makeMove() {
    const actions = this.game.doStep(this.playerId);
    const piece = this.pieces.get(this.playerId);

    if (piece == undefined) {
      throw new Error("Cannot find piece");
    }

    await handleActions(actions, piece);
  }
}