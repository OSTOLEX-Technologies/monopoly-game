import {GameData} from "./GameData";
import {Game} from "../game/Game";

export class GameController {
  private game: Game;

  constructor(data: GameData) {
    this.game = new Game(data);
  }
}