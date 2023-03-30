import {Action} from "./Action";

export class GetOutOfJailAction extends Action{
  constructor(dice: Array<number>, playerId: string) {
    super([], playerId);
  }

  doAction(): void {
  }
}