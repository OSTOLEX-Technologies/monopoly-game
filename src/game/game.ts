import Monopoly from "monopolygame";
class Game {
  game: Monopoly;
  userTeam: Team;

  constructor(board: Board | any, teams: number, userTeam: number) {
    this.game = new Monopoly({board, teams});
    this.userTeam = this.game.teams[userTeam];

    console.log(this.game)
  }

  public makeUserMove() {
    const movement = this.game.teams[0].move(3);
    console.log(movement)
  }

  public applyMovement(movement: Movement) {

  }

  getRandomMove() {
    return Math.round(Math.random() * 12);
  }
}

export default Game;