import {Card} from "./Card";

export class UtilitiesCard extends Card {
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
}