export abstract class Card {
  protected id: string;
  protected title: string;
  protected type: CardType;

  protected constructor(id: string, title: string, type: CardType) {
    this.id = id;
    this.title = title;
    this.type = type;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }
}

export enum CardType {
  Chance,
  Community,
  Property,
  RailRoad,
  Utility,
}