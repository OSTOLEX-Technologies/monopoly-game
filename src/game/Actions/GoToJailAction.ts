import {Action} from "./Action";
import {Board} from "../Board";

export class GoToJailAction extends Action {
  constructor(dice: Array<number>, playerId: string) {
    super(dice, playerId);
  }
  doAction(board: Board): void {
    board.goToJail(this.playerId);
  }
}