import Card from "./card";

class CommunityChestCard extends Card {
  description: string;
  background: string;

  constructor(id: string, title: string, description: string, background: string, type: string) {
    super(id, title, type);

    this.description = description;
    this.background = background;
  }
}

export default CommunityChestCard;