import {Card} from "./Card";

export class CommunityChestCard extends Card {
  description: string;

  constructor(id: string, title: string, description: string) {
    super(id, title);

    this.description = description;
  }
}