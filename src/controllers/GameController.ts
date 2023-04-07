import {GameData} from "./GameData";
import {Game} from "../game/Game";
import {boardView} from "../viewGlobals";
import {Action} from "../game/Actions/Action";
import {MoveAction} from "../game/Actions/MoveAction";
import {GoAction} from "../game/Actions/GoAction";
import {GoToJailAction} from "../game/Actions/GoToJailAction";
import {GetOutOfJailAction} from "../game/Actions/GetOutOfJailAction";
import {ChanceAction} from "../game/Actions/ChanceAction";
import {CommunityAction} from "../game/Actions/CommunityAction";
import {GetFreeCardAction} from "../game/Actions/GetFreeCardAction";
import {PayAction} from "../game/Actions/PayAction";

export class GameController {
  private game: Game;
  private playerId: string;

  constructor(data: GameData, playerId: string) {
    this.game = new Game(data);
    this.playerId = playerId;

    this.initGame();
  }

  private initGame() {
  }

  public async makeMove() {
    const actions = this.game.doStep(this.playerId);
    this.handleActions(actions);
  }

  private handleActions(actions: Array<Action>) {
    actions.forEach((action) => {
      this.handleAction(action);
    });
  }

  private handleAction(action: Action) {
    if (action instanceof MoveAction) this.handleMoveAction(action);
    else if (action instanceof GoAction) this.handleGoAction(action);
    else if (action instanceof GoToJailAction) this.handleGoToJailAction(action);
    else if (action instanceof GetOutOfJailAction) this.handleGetOutOfJailAction(action);
    else if (action instanceof ChanceAction) this.handleChanceAction(action);
    else if (action instanceof CommunityAction) this.handleCommunityAction(action);
    else if (action instanceof GetFreeCardAction) this.handleGetFreeCardAction(action);
    else if (action instanceof PayAction) this.handlePayAction(action);
  }

  private handleMoveAction(action: MoveAction) {}

  private handleGoAction(action: GoAction) {}

  private handleGoToJailAction(action: GoToJailAction) {}

  private handleGetOutOfJailAction(action: GetOutOfJailAction) {}

  private handleChanceAction(action: ChanceAction) {}

  private handleCommunityAction(action: CommunityAction) {}

  private handleGetFreeCardAction(action: GetFreeCardAction) {}

  private handlePayAction(action: PayAction) {}
}