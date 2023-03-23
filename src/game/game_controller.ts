import Monopoly from "monopolygame";

class GameController {
  game: Monopoly;

  constructor() {
    const options = {board: {}, teams: 2};

    this.game = new Monopoly(options);
    console.log(this.game)
  }
}

export default GameController;