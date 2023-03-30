import {Action} from "./Action";
import {Board} from "../Board";

export class MoveAction extends Action {
  private position: number;

  constructor(playerId: string, position: number, dice: Array<number>) {
    super(dice, playerId);

    this.position = position;
  }

  doAction(board: Board): void {
  }
}