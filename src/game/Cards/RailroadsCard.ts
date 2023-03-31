import {Card, CardType} from "./Card";
import {ICardRent} from "./ICardRent";

export class RailroadsCard extends Card implements ICardRent {
  private readonly price: number;
  private readonly rent: number;
  private readonly ifTwoCards: number;
  private readonly ifThreeCards: number;
  private readonly ifFourCards: number;
  private mortgage: number;

  constructor(
    id: string,
    title: string,
    color: string,
    price: number,
    rent: number,
    ifTwoCards: number,
    ifThreeCards: number,
    ifFourCards: number,
    mortgage: number) {
    super(id, title, CardType.RailRoad);

    this.price = price;
    this.rent = rent;
    this.ifTwoCards = ifTwoCards;
    this.ifThreeCards = ifThreeCards;
    this.ifFourCards = ifFourCards;
    this.mortgage = mortgage;
  }

  public getPrice() {
    return this.price;
  }

  public getRent(quantityOfCards: number) {
    if (quantityOfCards === 1) {
      return this.rent;
    } else if (quantityOfCards === 2) {
      return this.ifTwoCards;
    } else if (quantityOfCards === 3) {
      return this.ifThreeCards;
    } else {
      return this.ifFourCards;
    }
  }
}