import {Action} from "./Action";

export class GoToJailAction extends Action {
  constructor(playerId: string, dice: Array<number>) {
    super(dice, playerId);
  }
  doAction(): void {
  }
}