import {Action} from "./Action";

export class PayAction extends Action {
  from: string;
  to: string;
  amount: number;

  constructor(from: string, to: string, amount: number) {
    super([], "");

    this.from = from;
    this.to = to;
    this.amount = amount;
  }

  doAction(): void {
  }
}