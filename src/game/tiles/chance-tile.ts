import Tile from "./tile";
import Player from "../player";

class ChanceTile extends Tile {
  constructor(name: string, players: Array<Player>, owner: Player | null) {
    super(name, owner, players);
  }
}

export default ChanceTile;