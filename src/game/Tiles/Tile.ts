import {Player} from "../Player";

export class Tile {
  name: string;
  owner: Player | null;
  players: Array<Player>;

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