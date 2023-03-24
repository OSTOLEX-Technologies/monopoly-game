import Tile from "./tile";
import Player from "../player";

class GoTile extends Tile {
  price: number;

  constructor(name: string, players: Array<Player>, owner: Player | null, price: number) {
    super(name, owner, players);

    this.price = price;
  }
}

export default GoTile;