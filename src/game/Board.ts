import {Player} from "./Player";
import {PropertyCard} from "./Cards/PropertyCard";
import {CommunityChest} from "./Cards/CommunityChest";
import {ChanceCard} from "./Cards/ChanceCard";
import {Tile} from "./Tiles/Tile";
import {
  cmpsOrder, getChanceCards,
  getCommunityChestCards,
  tokens
} from "./GameConfig";
import {Bank} from "./Bank";
import {Action} from "./Actions/Action";
import {throwDice} from "./Utils";
import {ErrorAction} from "./Actions/ErrorAction";
import {MoveAction} from "./Actions/MoveAction";
import {GetOutOfJailAction} from "./Actions/GetOutOfJailAction";

export class Board {
  public tokens: ReadonlyArray<{ name: string }>;
  public cmpsOrder: ReadonlyArray<string>;
  private currentPlayer: Player;
  private players: Array<Player>;
  private communityChestCards: Array<CommunityChest>;
  private chanceCards: Array<ChanceCard>;
  private tiles: Array<Tile>;
  private bank: Bank;

  constructor(tiles: Array<Tile>, players: Array<Player>, bank: Bank) {
    this.tokens = tokens;
    this.tiles = tiles;
    this.cmpsOrder = cmpsOrder;
    this.communityChestCards = getCommunityChestCards();
    this.chanceCards = getChanceCards();
    this.currentPlayer = players[0];
    this.players = players;
    this.bank = bank;
  }

  public doStep(playerIdx: number): Array<Action> {
    const dice = throwDice();
    return this.applyDice(playerIdx, dice);
  }

  private applyDice(playerIdx: number, dice: Array<number>): Array<Action> {
    if (!this.isCurrentPlayer(playerIdx))
      return [new ErrorAction()];

    if (this.isInJail(playerIdx)) {
      return this.increaseStepsInJail(playerIdx, dice);
    }

    this.movePlayerToNewTile(dice, playerIdx);

    const currTile = this.tiles[this.currentPlayer.getPosition()];
    return [];
  }

  private isCurrentPlayer(playerIdx: number): boolean {
    return this.players[playerIdx].getId() == this.currentPlayer.getId();
  }

  private isInJail(playerIdx: number): boolean {
    return this.players[playerIdx].getStepsInJail() != 0;
  }

  private increaseStepsInJail(playerIdx: number, dice: Array<number>): Array<Action> {
    this.players[playerIdx].increaseStepsInJail();
    const isDouble = dice[0] == dice[1];
    let result = new Array<Action>();

    if (isDouble) {
      this.getOutOfJail(playerIdx);
      result.push(new GetOutOfJailAction());
      result.push(...this.applyDice(playerIdx, dice));
    } else {
      result.push(new MoveAction(dice));
    }

    return result;
  }

  private movePlayerToNewTile(dice: Array<number>, playerIdx: number) {
    this.tiles[this.currentPlayer.getPosition()].removePlayer(this.currentPlayer.getId());
    this.calculateNewPosition(dice, playerIdx);
    this.tiles[this.currentPlayer.getPosition()].addPlayer(this.currentPlayer);
  }
  private calculateNewPosition(dice: Array<number>, playerIdx: number) {
    const currPosition = this.currentPlayer.getPosition();
    let newPosition =  + dice[0] + dice[1];

    if (newPosition > 39){
      newPosition -= 40;
    }

    if (currPosition > newPosition) {
      this.bank.collectMoney(playerIdx, 200);
    }

    this.currentPlayer.setPosition(newPosition);
  }

  private goToJail(playerIdx: number) {
    this.players[playerIdx].setStepsInJail(3);
  }

  private getOutOfJail(playerIdx: number) {
    this.players[playerIdx].setStepsInJail(0);
  }

  private doChanceTask(card: ChanceCard, dice: Array<number>, playerIdx: number) {
    let newPosition;
    let currPosition;

    switch (card.getId()) {
      case 'chance-201': // Advance to "Go". (Collect $200)
        this.applyDice(playerIdx, dice);
        break;
      case 'chance-202': // Advance to Illinois Ave. {Avenue}. If you pass Go, collect $200.
        this.applyDice(playerIdx, dice);
        break;
      case 'chance-203': // Advance to St. Charles Place. If you pass Go, collect $200
        if (this.currentPlayer.getPosition() > 35) {
          this.bank.collectMoney(playerIdx, 200);
        }
        // this.doStep(11, dice, playerIdx);
        break;
      case 'chance-204': // Advance token to the nearest Utility
        currPosition = this.currentPlayer.getPosition();
        if (currPosition === 7) {
          newPosition = 12;
        } else {
          newPosition = 28;
        }
        // this.doStep(newPosition, dice, playerIdx);
        this.currentPlayer.setIsNextPayByDice({ isTrue: true, payTo: null });
        break;
      case 'chance-205': // Advance to the nearest Railroad
        currPosition = this.currentPlayer.getPosition();
        if (currPosition === 7) {
          newPosition = 15;
        } else if (currPosition === 22) {
          newPosition = 25;
        } else {
          newPosition = 5;
        }
        // this.doStep(newPosition, dice, playerIdx);
        this.currentPlayer.setIsNextPayByDice({ isTrue: true, payTo: null });
        break;
      case 'chance-206': // Bank pays you dividend of $50
        this.bank.collectMoney(playerIdx, 20);
        break;
      case 'chance-207': // Get out of Jail Free
        const cardIdx = this.chanceCards.findIndex(
          (c: ChanceCard) => c.getId() == card.getId()
        );
        let cardToSave = this.chanceCards.splice(cardIdx, 1);
        this.players[playerIdx].chanceCards.push(...cardToSave);
        break;
      case 'chance-208': // Go Back 3 Spaces
        const posBack = this.currentPlayer.getPosition() - 3;
        // this.doStep(posBack, dice, playerIdx);
        break;
      case 'chance-209': // Go to Jail
        this.goToJail(playerIdx);
        break;
      case 'chance-210': // Make general repairs on all your property
        let homeCount = 0;
        let hotelCount = 0;
        this.players[playerIdx].propertyCards.forEach((card: PropertyCard) => {
          if (card.hasHotel()) {
            hotelCount++;
          } else {
            homeCount += card.getNumberOfHouses();
          }
        });
        this.players[playerIdx].decreaseBalance(homeCount * 25);
        this.players[playerIdx].decreaseBalance(hotelCount * 100);
        break;
      case 'chance-211': // Pay poor tax of $15
        this.bank.payMoney(playerIdx, 15);
        break;
      case 'chance-212': // collect $200
        const playerPos = this.players[playerIdx].getPosition();
        if (playerPos > 5) {
          this.players[playerIdx].increaseBalance(200);
        }
        // this.doStep(5, dice, playerIdx);
        break;
      case 'chance-213': // Advance token to Boardwalk
        // this.doStep(39, dice, playerIdx);
        break;
      case 'chance-214': // PAY EACH PLAYER $50
        const currPlayer = this.players[playerIdx];
        this.players.forEach((player: Player) => {
          if (player.getId() != currPlayer.getId()) {
            player.increaseBalance(50);
            this.players[playerIdx].decreaseBalance(50);
          }
        });
        break;
      case 'chance-215':
        this.bank.collectMoney(playerIdx, 150);
        break;
      case 'chance-216':
        this.bank.collectMoney(playerIdx, 100);
        break;
      default:
        console.log("Chance card not found");
    }
  }

  private doCommunityTask(card: CommunityChest, currentDice: Array<number>, playerIdx: number) {

    switch (card.getId()) {
      case 'community-101': // Advance to "Go". (Collect $200)
        break;
      case 'community-102': // Collect $100
        this.bank.collectMoney(playerIdx, 100);
        break;
      case 'community-103': // Get Out of Jail Free
        const cardIdx = this.communityChestCards.findIndex(
          (c: CommunityChest) => c.getId() == card.getId()
        );
        let cardToSave = this.communityChestCards.splice(
          cardIdx,
          1
        );
        this.currentPlayer.communityChestCards.push(...cardToSave);
        break;
      case 'community-104': // Collect $10
        this.bank.collectMoney(playerIdx, 10);
        break
      case 'community-105': // Collect $200
        this.bank.collectMoney(playerIdx, 200);
        break;
      case 'community-106': // get $50
        this.bank.collectMoney(playerIdx, 50);
        break
      case 'community-107': // Collect $20
        this.bank.collectMoney(playerIdx, 20);
        break
      case 'community-108': // Receive for services $25.
        this.bank.collectMoney(playerIdx, 25);
        break;
      case 'community-109': // You inherit $100
        this.bank.collectMoney(playerIdx, 100);
        break;
      case 'community-110': // Collect $100
        this.bank.collectMoney(playerIdx, 100);
        break;
      case 'community-111': // Collect $50 from every player for opening night seats
        this.players.forEach((player: Player) => {
          if (player.getId() != this.currentPlayer.getId()) {
            player.decreaseBalance(50);
            this.currentPlayer.increaseBalance(50);
          }
        });
        break;
      case 'community-112': // Pay $50
        this.bank.payMoney(playerIdx, 50);
        break;
      case 'community-113': // Pay hospital $100
        this.bank.payMoney(playerIdx, 100);
        break;
      case 'community-114': // Pay school tax of $150
        this.bank.payMoney(playerIdx, 150);
        break;
      case 'community-115': // You are assessed for street repairs: Pay $40 per house and $115 per hotel you own
        let homeCount = 0;
        let hotelCount = 0;
        this.currentPlayer.propertyCards.forEach((card: PropertyCard) => {
          if (card.hasHotel()) {
            hotelCount++;
          }
          else {
            homeCount += card.getNumberOfHouses();
          }
        })
        this.currentPlayer.decreaseBalance(homeCount * 40);
        this.currentPlayer.decreaseBalance(hotelCount * 115);
        break;
      case 'community-116': // Go to Jail
        this.goToJail(playerIdx);
        break;
      default:
        console.log("Community task card not found");
    }
  }

  public getCurrentPlayer() : Player {
    return this.getPlayerById(this.currentPlayer.getId());
  }

  public getPlayerById(playerId: string): Player {
    let result = this.players.find((x) => x.getId() == playerId);

    if (result != undefined) {
      return result;
    }

    throw new Error("Player with id " + playerId + " not found");
  }
}