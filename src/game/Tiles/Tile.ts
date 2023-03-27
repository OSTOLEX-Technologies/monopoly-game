import {Player} from "../Player";

export abstract class Tile {
  private name: string;
  private owner: Player | null;
  private players: Array<Player>;

  protected constructor(name: string, owner: Player | null, players: Array<Player>) {
    this.name = name;
    this.owner = owner;
    this.players = players;
  }

  public getName(): string {
    return  this.name;
  }

  public getOwnerId(): string {
    if (this.owner != null) {
      return this.owner.getId();
    }

    throw new Error("Tile hasn't owner");
  }

  public setOwner(owner: Player) {
    this.owner = owner;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(playerId: string) {
    this.players = this.players.filter((player: Player) => playerId != player.getId());
  }
}