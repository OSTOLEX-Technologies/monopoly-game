import {Player} from "../game/Player";
import {IOffer} from "../game/Offers/IOffer";
import {Action} from "../game/Actions/Action";

export class GameData {
  public players: Array<Player>;
  public currentPlayerId: string;
  public currentOffer: IOffer;
  public lastActions: Array<Action>;

  constructor(players: Array<Player>, currentPlayerId: string, currentOffer: IOffer, lastAction: Array<Action>) {
    this.players = players;
    this.currentPlayerId = currentPlayerId;
    this.currentOffer = currentOffer;
    this.lastActions = lastAction;
  }
}