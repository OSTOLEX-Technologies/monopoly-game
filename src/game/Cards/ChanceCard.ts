import {Card} from "./Card";

export class ChanceCard extends Card {
  private description: string;

  constructor(id: string, title: string, description: string) {
    super(id, title);

    this.description = description;
  }
}