import {Action} from "./Action";
import {Board} from "../Board";

export class GoAction extends Action {
  constructor(playerId: string) {
    super([] ,playerId);
  }
  doAction(board: Board): void {
  }
}