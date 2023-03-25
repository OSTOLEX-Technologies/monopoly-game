import {Card} from "./Card";

export class UtilitiesCard extends Card {
  price: number;
  rent: string;
  twoAreOwned: string;
  mortgage: number;

  constructor(id: string, title: string, price: number, rent: string, twoAreOwned: string, mortgage: number) {
    super(id, title);

    this.price = price;
    this.rent = rent;
    this.twoAreOwned = twoAreOwned;
    this.mortgage = mortgage;
  }
}