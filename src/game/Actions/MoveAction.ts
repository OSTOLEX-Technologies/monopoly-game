import {Action} from "./Action";

export class MoveAction extends Action {

  constructor(dice: Array<number>) {
    super(dice);
  }

  doAction(): void {
  }
}