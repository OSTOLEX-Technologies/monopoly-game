import {Tile} from "./Tile";
import {Player} from "../Player";

export class GoTile extends Tile {
  private price: number;

  constructor(name: string, players: Array<Player>, owner: Player | null, price: number) {
    super(name, owner, players);

    this.price = price;
  }
}