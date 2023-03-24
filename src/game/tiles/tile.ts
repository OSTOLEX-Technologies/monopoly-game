import player from "../player";
import Player from "../player";

class Tile {
  name: string;
  owner: Player | null;
  players: Array<player>;

  constructor(name: string, owner: Player | null, players: Array<Player>) {
    this.name = name;
    this.owner = owner;
    this.players = players;
  }

  getOwnerId(): string {
    if (this.owner != null) {
      return this.owner.id;
    }

    throw new Error("Tile hasn't owner");
  }
}

export default Tile;