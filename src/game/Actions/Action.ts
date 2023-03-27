export abstract class Action {
  public readonly dice: Array<number>;

  protected constructor(dice: Array<number>) {
    this.dice = dice;
  }

  public abstract doAction(): void;
}