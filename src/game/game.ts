import Board from "./board";
import Player from "./player";

class Game {
  board: Board;
  currDice: any;

  constructor(players: any) {
    this.board = new Board(players);
  }

  doSteps(newPosition: any, currentDice: any, playerId: number) {
    let currPosition = this.board.currentPlayer.position;
    let playerToStep = this.board.currentPlayer;
    const isInJail = this.board.players[playerId].isInJail
    let isDouble
    if (currentDice?.length) {
      isDouble = currentDice[0] === currentDice[1]
    }

    if (isInJail) {
      this.board.players[playerId].isInJail--
      if (isDouble) {
        this.getOutOfJail(playerId);
        this.doSteps(newPosition, currentDice, playerId);
      }
      return;
    }

    if (isDouble) this.board.doubleCount++
    if (newPosition >= 0 && currPosition > newPosition) {
      this.collectMoney(playerId, 200);
      currPosition = this.board.currentPlayer.position;
      playerToStep = this.board.currentPlayer;
      playerId = this.board.players.findIndex(
        (player: Player) => player.id === playerToStep.id
      )
    }

    // Remove player from last pos:
    this.board.tiles[currPosition].players = this.board.tiles[
      currPosition
      ].players.filter((player: Player) => playerToStep._id !== player.id)

    playerToStep.position = newPosition

    // place player in new pos:
    this.board.tiles[newPosition].players.push(playerToStep)
    this.board.players[playerId].position = newPosition
  }

  getOutOfJail(playerId: number) {
    this.board.doubleCount = 0
    this.board.players[playerId].isInJail = 0
  }

  collectMoney(playerId: number, amount: number) {
    this.board.players[playerId].balance += amount
  }
}

export default Game;