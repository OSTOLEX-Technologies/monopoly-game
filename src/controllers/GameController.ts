import {GameData} from "./GameData";
import {Game} from "../game/Game";
import {handleActions} from "./handleActions";
import {PiecePresenter} from "../board";
import {boardView} from "../viewGlobals";

export class GameController {
  private game: Game;
  private playerId: string;
  private pieces: Map<string, PiecePresenter>;

  constructor(data: GameData, playerId: string) {
    this.game = new Game(data);
    this.playerId = playerId;
    this.pieces = new Map<string, PiecePresenter>();

    this.initGame(data);
  }

  private initGame(data: GameData) {
    data.players.forEach((player) => {
      const piece = boardView.addPiece(player.getPosition(), player.color);
      this.pieces.set(player.getId(), piece);
    });
  }

  public getPlayers() {
    return this.game.getPlayers();
  }

  public async makeMove() {
    const actions = this.game.doStep(this.playerId);
    // handleActions(actions);
  }
}