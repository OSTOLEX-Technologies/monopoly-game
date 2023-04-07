import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";
import {CommunityChestTile} from "../Tiles/CommunityChestTile";
import {ChanceTile} from "../Tiles/ChanceTile";
import {TaxTile} from "../Tiles/TaxTile";
import {JailTile} from "../Tiles/JailTile";
import {GoToJailAction} from "./GoToJailAction";

export class MoveAction extends Action {
  public readonly position: number;

  constructor(playerId: string, position: number, dice: Array<number>) {
    super(dice, playerId);

    this.position = position;
  }

  public doAction(board: Board): Array<Action> {
    if (this.dice.length == 0) {
       board.advancePlayer(this.position, this.playerId);
       return [];
    }

    const actions = board.movePlayerToNewTile(this.dice, this.playerId);

    const player = getPlayerById(this.playerId, board.players);
    const playerPosition = player.getPosition();
    const currTile = board.tiles[playerPosition];

    if (currTile instanceof CommunityChestTile || currTile instanceof ChanceTile) {
      actions.push(currTile.doTask(this.playerId, board.players));
    } else if (currTile instanceof TaxTile) {
      actions.push(currTile.getPayTaxAction(this.playerId));
    } else if (currTile instanceof JailTile) {
      actions.push(new GoToJailAction(this.dice, this.playerId));
    } else if (currTile.hasOwner() && currTile.getOwnerId() != this.playerId) {
      actions.push(currTile.getPayRentAction(this.playerId, this.dice));
    } else if (playerPosition == 22) {
      actions.push(new GoToJailAction(this.dice, this.playerId));
    }

    actions.forEach((action) => {
      action.doAction(board);
    });

    let result = new Array<Action> (this);
    result.push(...actions);

    return result;
  }
}