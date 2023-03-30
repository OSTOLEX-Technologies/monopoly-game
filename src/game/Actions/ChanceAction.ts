import {Action} from "./Action";
import {Board} from "../Board";

export class ChanceAction extends Action {
  private actions: Array<Action>;
  private description: string;

  constructor(playerId: string, actions: Array<Action>, description: string) {
    super([], playerId);

    this.actions = actions;
    this.description = description;
  }

  doAction(board: Board): void {
    this.actions.forEach((action) => {
      action.doAction(board);
    });
  }
}