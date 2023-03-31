import {Action} from "./Action";
import {Board} from "../Board";

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

  doAction(board: Board): void {
    board.bank.payMoney(this.from, this.to, this.amount);
  }
}