import {Card} from "./Card";
import {ICardTask} from "./ICardTask";
import {Action} from "../Actions/Action";
import {Player} from "../Player";
import {getPlayerById} from "../Utils";
import {MoveAction} from "../Actions/MoveAction";
import {GoAction} from "../Actions/GoAction";
import {PropertyCard} from "./PropertyCard";
import {ChanceAction} from "../Actions/ChanceAction";
import {PayAction} from "../Actions/PayAction";
import {GetFreeCardAction} from "../Actions/GetFreeCardAction";
import {GoToJailAction} from "../Actions/GoToJailAction";

export class ChanceCard extends Card implements ICardTask {
  private description: string;

  constructor(id: string, title: string, description: string) {
    super(id, title);

    this.description = description;
  }

  doTask(playerId: string, players: Array<Player>): Action {
    let player = getPlayerById(playerId, players);

    let actions: Array<Action> = [];
    switch (this.getId()) {
      case 'chance-201': // Advance to "Go". (Collect $200)
        actions.push(new MoveAction(playerId, 0, []), new GoAction(playerId));
        break;
      case 'chance-202': // Advance to Illinois Ave. {Avenue}. If you pass Go, collect $200.
        actions.push(new MoveAction(playerId, 13, []));
        if (player.getPosition() > 13) {
          actions.push(new GoAction(playerId));
        }

        break;
      case 'chance-203': // Advance to St. Charles Place. If you pass Go, collect $200
        actions.push(new MoveAction(playerId, 13, []));
        if (player.getPosition() > 35) {
          actions.push(new GoAction(playerId));
        }

        break;
      case 'chance-204': // Advance token to the nearest Utility
        /* TODO:
        currPosition = player.getPosition();
        if (currPosition === 7) {
          newPosition = 12;
        } else {
          newPosition = 28;
        }
        */
        // this.doStep(newPosition, dice, playerIdx);
        player.setIsNextPayByDice({ isTrue: true, payTo: null });
        break;
      case 'chance-205': // Advance to the nearest Railroad
        /* TODO:
        currPosition = player.getPosition();
        if (currPosition === 7) {
          newPosition = 15;
        } else if (currPosition === 22) {
          newPosition = 25;
        } else {
          newPosition = 5;
        }
         */
        // this.doStep(newPosition, dice, playerIdx);
        player.setIsNextPayByDice({ isTrue: true, payTo: null });
        break;
      case 'chance-206': // Bank pays you dividend of $50
        actions.push(new PayAction("bank", playerId, 50))
        break;
      case 'chance-207': // Get out of Jail Free
        actions.push(new GetFreeCardAction(playerId));
        player.chanceCards.push(this);
        break;
      case 'chance-208': // Go Back 3 Spaces
        const posBack = player.getPosition() - 3;
        actions.push(new MoveAction(playerId, posBack, []));
        break;
      case 'chance-209': // Go to Jail
        actions.push(new GoToJailAction(playerId, []));
        break;
      case 'chance-210': // Make general repairs on all your property
        let homeCount = 0;
        let hotelCount = 0;
        player.propertyCards.forEach((card: PropertyCard) => {
          if (card.hasHotel()) {
            hotelCount++;
          } else {
            homeCount += card.getNumberOfHouses();
          }
        });

        const rent = homeCount * 25 + hotelCount * 100;
        actions.push(new PayAction(playerId, "bank", rent))
        break;
      case 'chance-211': // Pay poor tax of $15
        actions.push(new PayAction(playerId, "bank", 15));
        break;
      case 'chance-212': // collect $200
        const playerPos = player.getPosition();
        if (playerPos > 5) {
          actions.push(new GoAction(playerId));
        }

        actions.push(new MoveAction(playerId, 5, []));
        break;
      case 'chance-213': // Advance token to Boardwalk
        actions.push(new MoveAction(playerId, 39, []));
        break;
      case 'chance-214': // PAY EACH PLAYER $50
        players.forEach((p: Player) => {
          if (p.getId() != player.getId()) {
            actions.push(new PayAction(player.getId(), p.getId(), 50));
          }
        });
        break;
      case 'chance-215':
        actions.push(new PayAction("bank", playerId, 150));
        break;
      case 'chance-216':
        actions.push(new PayAction("bank", playerId, 100));
        break;
      default:
        console.log("Chance card not found");
    }


    return new ChanceAction(playerId, actions, this.description);
  }
}