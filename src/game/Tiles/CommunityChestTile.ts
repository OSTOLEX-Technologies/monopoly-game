import {Tile} from "./Tile";
import {Player} from "../Player";
import {ITileTask} from "./ITileTask";
import {Action} from "../Actions/Action";

export class CommunityChestTile extends Tile implements ITileTask {
  constructor(name: string, players: Array<Player>, owner: Player | null) {
    super(name, owner, players);
  }

  public doTask(): Array<Action> {
    return undefined;
  }
}