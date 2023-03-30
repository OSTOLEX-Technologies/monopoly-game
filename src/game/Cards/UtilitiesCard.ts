import {Card} from "./Card";
import {ICardRent} from "./ICardRent";

export class UtilitiesCard extends Card implements ICardRent {
  private price: number;
  private rent: string;
  private twoAreOwned: string;
  private mortgage: number;

  constructor(id: string, title: string, price: number, rent: string, twoAreOwned: string, mortgage: number) {
    super(id, title);

    this.price = price;
    this.rent = rent;
    this.twoAreOwned = twoAreOwned;
    this.mortgage = mortgage;
  }

  public getPrice() {
    return this.price;
  }

  getRent(quantityOfCards: number, dice: Array<number>): number {
    if (quantityOfCards == 1) {
      return (dice[0] + dice[1]) * 4;
    } else {
      return (dice[0] + dice[1]) * 10;
    }
  }
}