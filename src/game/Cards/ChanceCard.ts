import {Card} from "./Card";

export class ChanceCard extends Card {
  description: string;
  background: string;

  constructor(id: string, title: string, description: string, background: string, type: string) {
    super(id, title, type);

    this.description = description;
    this.background = background;
  }
}