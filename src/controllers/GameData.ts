import {Player} from "../game/Player";
import {IOffer} from "../game/Offers/IOffer";
import {Action} from "../game/Actions/Action";
import {Transaction} from "../game/Offers/Transaction";

export class GameData {
  constructor(public players: Array<Player>,
              public currentPlayerId: string,
              public currentOffers: Array<IOffer>,
              public lastTransactions: Array<Transaction>,
              public lastActions: Array<Action>,
              public voteKick: Map<string, number>,
              public players_votes: Map<string, Array<string>>,
              public players_in_game: Array<string>) { }
}