import {Board} from "./Board";
import {Player} from "./Player";
import {Bank} from "./Bank";
import {getTiles} from "./GameConfig";

export class Game {
  private board: Board;
  private bank: Bank;
  private currentDice: Array<number> | null;

  constructor(players: Array<Player>) {
    let tiles = getTiles(players);

    this.bank = new Bank(tiles, players);
    this.board = new Board(tiles, players, this.bank);
    this.currentDice = null;
  }

  doSteps(newPosition: number, currentDice: Array<number>, playerIdx: number) {
  }
}