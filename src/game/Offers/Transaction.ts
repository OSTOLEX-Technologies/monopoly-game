import {IOffer} from "./IOffer";

export class Transaction {
  private offer: IOffer;
  private status: TransactionStatus;

  constructor(offer: IOffer, status: TransactionStatus) {
    this.offer = offer;
    this.status = status;
  }
}

enum TransactionStatus {
  Succeeded,
  Rejected,
}