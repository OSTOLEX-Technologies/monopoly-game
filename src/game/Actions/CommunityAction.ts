import {Action} from "./Action";
import {Board} from "../Board";

export class CommunityAction extends Action {
  private readonly actions: Array<Action>;
  private description: string;

  constructor(playerId: string, actions: Array<Action>, description: string) {
    super([], playerId);

    this.actions = actions;
    this.description = description;
  }

  public getActions(): Array<Action> {
    return this.actions;
  }

  doAction(board: Board): void {
    this.actions.forEach((action) => {
        action.doAction(board);
    });
  }
}