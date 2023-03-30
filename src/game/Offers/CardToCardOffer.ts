import {IOffer} from "./IOffer";
import {Player} from "../Player";
import {Card} from "../Cards/Card";
import {Tile} from "../Tiles/Tile";

export class CardToCardOffer implements IOffer {
  offer(players: Array<Player>, cards: Array<Card>, tiles: Array<Tile>): void {
  }
}