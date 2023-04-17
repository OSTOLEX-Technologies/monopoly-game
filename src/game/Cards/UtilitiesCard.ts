import {Card, CardType} from "./Card";
import {ICardRent} from "./ICardRent";

export class UtilitiesCard extends Card implements ICardRent {
  private readonly price: number;
  private rent: string;
  private readonly logo: string;
  private twoAreOwned: string;
  private mortgage: number;

  constructor(id: string, title: string, price: number, rent: string, logo: string, twoAreOwned: string, mortgage: number) {
    super(id, title, CardType.Utility);

    this.price = price;
    this.rent = rent;
    this.logo = logo;
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