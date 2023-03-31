import {Action} from "./Action";
import {Board} from "../Board";

export class GetOutOfJailAction extends Action{
  constructor(dice: Array<number>, playerId: string) {
    super(dice, playerId);
  }

  doAction(board: Board): void {
    board.getOutOfJail(this.playerId);
  }
}