import {Card} from "./Card";
import {IRentPayable} from "./IRentPayable";

export class RailroadsCard extends Card {
  color: string;
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
    mortgage: number,
    type: string) {
    super(id, title, type);

    this.color = color;
    this.price = price;
    this.rent = rent;
    this.ifTwoCards = ifTwoCards;
    this.ifThreeCards = ifThreeCards;
    this.ifFourCards = ifFourCards;
    this.mortgage = mortgage;
  }
}