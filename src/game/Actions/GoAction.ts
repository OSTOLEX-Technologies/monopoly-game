import {Action} from "./Action";
import {Board} from "../Board";

export class GoAction extends Action {
  constructor(dice: Array<number>, playerId: string) {
    super(dice ,playerId);
  }
  doAction(board: Board): void {
    board.bank.collectMoney(this.playerId, 200);
  }
}