import Player from "../player";
import Tile from "./tile";

class CityTile extends Tile {
  price: number;

  constructor(name: string, players: Array<Player>, owner: Player | null, price: number) {
    super(name, owner, players);

    this.price = price;
  }
}

export default CityTile;