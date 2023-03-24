import {Player} from "../Player";
import {Tile} from "./Tile";

export class CityTile extends Tile {
  price: number;

  constructor(name: string, players: Array<Player>, owner: Player | null, price: number) {
    super(name, owner, players);

    this.price = price;
  }
}