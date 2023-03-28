import {IOffer} from "./IOffer";
import {Card} from "../Cards/Card";
import {Tile} from "../Tiles/Tile";
import {Player} from "../Player";

export class CardToMoneyOffer implements IOffer {
  private offer1: {userIdx: number, cardId: string};
  private offer2: {userIdx: number, moneyAmount: number};

  constructor(offer1: {userIdx: number, cardId: string}, offer2: {userIdx: number, moneyAmount: number}) {
    this.offer1 = offer1;
    this.offer2 = offer2;
  }

  offer(players: Array<Player>, cards: Array<Card>, tiles: Array<Tile>): void {
  }
}