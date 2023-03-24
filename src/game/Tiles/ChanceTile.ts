import {Tile} from "./Tile";
import {Player} from "../Player";

export class ChanceTile extends Tile {
  constructor(name: string, players: Array<Player>, owner: Player | null) {
    super(name, owner, players);
  }
}