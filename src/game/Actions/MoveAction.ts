import {Action} from "./Action";
import {Board} from "../Board";
import {getPlayerById} from "../Utils";
import {CommunityChestTile} from "../Tiles/CommunityChestTile";
import {ChanceTile} from "../Tiles/ChanceTile";
import {TaxTile} from "../Tiles/TaxTile";
import {JailTile} from "../Tiles/JailTile";
import {GoToJailAction} from "./GoToJailAction";

export class MoveAction extends Action {
  private position: number;

  constructor(playerId: string, position: number, dice: Array<number>) {
    super(dice, playerId);

    this.position = position;
  }

  public doAction(board: Board): Array<Action> {
    if (this.dice.length == 0) {
       board.advancePlayer(this.position, this.playerId);
       return [];
    }

    const result = board.movePlayerToNewTile(this.dice, this.playerId);

    const player = getPlayerById(this.playerId, board.players);
    const playerPosition = player.getPosition();
    const currTile = board.tiles[playerPosition];

    if (currTile instanceof CommunityChestTile || currTile instanceof ChanceTile) {
      result.push(currTile.doTask(this.playerId, board.players));
    } else if (currTile instanceof TaxTile) {
      result.push(currTile.getPayTaxAction(this.playerId));
    } else if (currTile instanceof JailTile) {
      result.push(new GoToJailAction(this.playerId, this.dice));
    } else if (currTile.hasOwner() && currTile.getOwnerId() != this.playerId) {
      result.push(currTile.getPayRentAction(this.playerId, this.dice));
    } else if (playerPosition == 22) {
      result.push(new GoToJailAction(this.playerId, this.dice));
    }

    result.forEach((action) => {
      action.doAction(board);
    });

    return result;
  }
}