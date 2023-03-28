import {Card} from "../Cards/Card";
import {Tile} from "../Tiles/Tile";
import {Player} from "../Player";

export interface IOffer {
  offer(players: Array<Player>, cards: Array<Card>, tiles: Array<Tile>): void;
}