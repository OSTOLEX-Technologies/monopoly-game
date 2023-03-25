import {Card} from "./Card";

export class RailroadsCard extends Card {
  price: number;
  rent: number;
  ifTwoCards: number;
  ifThreeCards: number;
  ifFourCards: number;
  mortgage: number;

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
    super(id, title);

    this.price = price;
    this.rent = rent;
    this.ifTwoCards = ifTwoCards;
    this.ifThreeCards = ifThreeCards;
    this.ifFourCards = ifFourCards;
    this.mortgage = mortgage;
  }
}