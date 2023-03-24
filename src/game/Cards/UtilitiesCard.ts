import {Card} from "./Card";
import {IRentPayable} from "./IRentPayable";

export class UtilitiesCard extends Card {
  price: number;
  rent: string;
  twoAreOwned: string;
  mortgage: number;
  background: string;

  constructor(id: string, title: string, price: number, rent: string, twoAreOwned: string, mortgage: number, background: string, type: string) {
    super(id, title, type);

    this.price = price;
    this.rent = rent;
    this.twoAreOwned = twoAreOwned;
    this.mortgage = mortgage;
    this.background = background;
  }
}