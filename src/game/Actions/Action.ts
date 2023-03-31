import {Board} from "../Board";

export abstract class Action {
  public readonly dice: Array<number>;
  public readonly playerId: string;

  protected constructor(dice: Array<number>, playerId: string) {
    this.dice = dice;
    this.playerId = playerId;
  }

  public abstract doAction(board: Board): void;
}