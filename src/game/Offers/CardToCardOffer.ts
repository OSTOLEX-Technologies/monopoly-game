import {IOffer} from "./IOffer";
import {CardType} from "../Cards/Card";
import {Bank} from "../Bank";

export class CardToCardOffer implements IOffer {
  private offer1: {userId: string, cardId: string, cardType: CardType};
  private offer2: {userId: string, cardId: string, cardType: CardType};

  constructor(offer1: {userId: string, cardId: string, cardType: CardType}, offer2: {userId: string, cardId: string, cardType: CardType}) {
    this.offer1 = offer1;
    this.offer2 = offer2;
  }

  public acceptOffer(bank: Bank): void {
    bank.transferCard(this.offer1.userId, this.offer2.userId, this.offer1.cardId, this.offer1.cardType);
    bank.transferCard(this.offer2.userId, this.offer1.userId, this.offer2.cardId, this.offer2.cardType);
  }
}