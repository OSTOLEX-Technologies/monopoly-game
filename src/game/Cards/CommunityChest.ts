import {Card} from "./Card";

export class CommunityChest extends Card {
  private description: string;

  constructor(id: string, title: string, description: string) {
    super(id, title);

    this.description = description;
  }
}