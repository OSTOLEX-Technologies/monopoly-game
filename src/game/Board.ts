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
import {getPlayerById, throwDice} from "./Utils";
import {ErrorAction} from "./Actions/ErrorAction";
import {MoveAction} from "./Actions/MoveAction";
import {GetOutOfJailAction} from "./Actions/GetOutOfJailAction";

export class Board {
  public tokens: ReadonlyArray<{ name: string }>;
  public cmpsOrder: ReadonlyArray<string>;
  private currentPlayerId: string;
  private players: Array<Player>;
  private communityChestCards: Array<CommunityChest>;
  private chanceCards: Array<ChanceCard>;
  private tiles: Array<Tile>;
  private bank: Bank;

  constructor(tiles: Array<Tile>, players: Array<Player>, currentPlayerId: string, bank: Bank) {
    this.tokens = tokens;
    this.tiles = tiles;
    this.cmpsOrder = cmpsOrder;
    this.communityChestCards = getCommunityChestCards();
    this.chanceCards = getChanceCards();
    this.currentPlayerId = currentPlayerId;
    this.players = players;
    this.bank = bank;

    this.removeReceivedCards();
  }

  private removeReceivedCards() {
    this.players.forEach((player) => {
      player.communityChestCards.forEach((communityCard) => {
        const cardIdx = this.communityChestCards.findIndex(
          (c: CommunityChest) => c.getId() == communityCard.getId()
        );
        this.communityChestCards.splice(cardIdx, 1);
      });

      player.chanceCards.forEach((chanceCard) => {
        const cardIdx = this.chanceCards.findIndex(
          (c: ChanceCard) => c.getId() == chanceCard.getId()
        );
        this.chanceCards.splice(cardIdx, 1);
      });
    })
  }

  public doStep(playerId: string): Array<Action> {
    const dice = throwDice();
    return this.applyDice(playerId, dice);
  }

  private applyDice(playerId: string, dice: Array<number>): Array<Action> {
    if (!this.isCurrentPlayer(playerId))
      return [new ErrorAction()];

    if (this.isInJail(playerId)) {
      return this.increaseStepsInJail(playerId, dice);
    }

    this.movePlayerToNewTile(dice, playerId);

    const player = getPlayerById(playerId, this.players);
    const playerPosition = player.getPosition();
    const currTile = this.tiles[playerPosition];
    return [];
  }

  private isCurrentPlayer(playerId: string): boolean {
    return playerId == this.currentPlayerId;
  }

  private isInJail(playerId: string): boolean {
    const player = getPlayerById(playerId, this.players);
    return player.getStepsInJail() != 0;
  }

  private increaseStepsInJail(playerId: string, dice: Array<number>): Array<Action> {
    let player = getPlayerById(playerId, this.players);
    player.increaseStepsInJail();
    const isDouble = dice[0] == dice[1];
    let result = new Array<Action>();

    if (isDouble) {
      this.getOutOfJail(player.getId());
      result.push(new GetOutOfJailAction());
      result.push(...this.applyDice(playerId, dice));
    } else {
      result.push(new MoveAction(dice));
    }

    return result;
  }

  private movePlayerToNewTile(dice: Array<number>, playerId: string) {
    const player = getPlayerById(playerId, this.players);
    this.tiles[player.getPosition()].removePlayer(playerId);
    this.calculateNewPosition(dice, playerId);
    this.tiles[player.getPosition()].addPlayer(player);
  }

  private calculateNewPosition(dice: Array<number>, playerId: string) {
    let player = getPlayerById(playerId, this.players);

    const currPosition = player.getPosition();
    let newPosition =  + dice[0] + dice[1];

    if (newPosition > 39){
      newPosition -= 40;
    }

    if (currPosition > newPosition) {
      this.bank.collectMoney(playerId, 200);
    }

    player.setPosition(newPosition);
  }

  private goToJail(playerId: string) {
    let player = getPlayerById(playerId, this.players);
    player.setStepsInJail(3);
  }

  private getOutOfJail(playerId: string) {
    let player = getPlayerById(playerId, this.players);
    player.setStepsInJail(0);
  }

  private doChanceTask(card: ChanceCard, dice: Array<number>, playerId: string) {
    let newPosition;
    let currPosition;
    let player = getPlayerById(playerId, this.players);

    switch (card.getId()) {
      case 'chance-201': // Advance to "Go". (Collect $200)
        this.applyDice(playerId, dice);
        break;
      case 'chance-202': // Advance to Illinois Ave. {Avenue}. If you pass Go, collect $200.
        this.applyDice(playerId, dice);
        break;
      case 'chance-203': // Advance to St. Charles Place. If you pass Go, collect $200
        if (player.getPosition() > 35) {
          this.bank.collectMoney(playerId, 200);
        }
        // this.doStep(11, dice, playerIdx);
        break;
      case 'chance-204': // Advance token to the nearest Utility
        currPosition = player.getPosition();
        if (currPosition === 7) {
          newPosition = 12;
        } else {
          newPosition = 28;
        }
        // this.doStep(newPosition, dice, playerIdx);
        player.setIsNextPayByDice({ isTrue: true, payTo: null });
        break;
      case 'chance-205': // Advance to the nearest Railroad
        currPosition = player.getPosition();
        if (currPosition === 7) {
          newPosition = 15;
        } else if (currPosition === 22) {
          newPosition = 25;
        } else {
          newPosition = 5;
        }
        // this.doStep(newPosition, dice, playerIdx);
        player.setIsNextPayByDice({ isTrue: true, payTo: null });
        break;
      case 'chance-206': // Bank pays you dividend of $50
        this.bank.collectMoney(playerId, 20);
        break;
      case 'chance-207': // Get out of Jail Free
        const cardIdx = this.chanceCards.findIndex(
          (c: ChanceCard) => c.getId() == card.getId()
        );
        let cardToSave = this.chanceCards.splice(cardIdx, 1);
        player.chanceCards.push(...cardToSave);
        break;
      case 'chance-208': // Go Back 3 Spaces
        const posBack = player.getPosition() - 3;
        // this.doStep(posBack, dice, playerIdx);
        break;
      case 'chance-209': // Go to Jail
        this.goToJail(playerId);
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
        player.decreaseBalance(homeCount * 25);
        player.decreaseBalance(hotelCount * 100);
        break;
      case 'chance-211': // Pay poor tax of $15
        this.bank.payMoney(playerId, 15);
        break;
      case 'chance-212': // collect $200
        const playerPos = player.getPosition();
        if (playerPos > 5) {
          player.increaseBalance(200);
        }
        // this.doStep(5, dice, playerIdx);
        break;
      case 'chance-213': // Advance token to Boardwalk
        // this.doStep(39, dice, playerIdx);
        break;
      case 'chance-214': // PAY EACH PLAYER $50
        this.players.forEach((p: Player) => {
          if (p.getId() != player.getId()) {
            p.increaseBalance(50);
            player.decreaseBalance(50);
          }
        });
        break;
      case 'chance-215':
        this.bank.collectMoney(playerId, 150);
        break;
      case 'chance-216':
        this.bank.collectMoney(playerId, 100);
        break;
      default:
        console.log("Chance card not found");
    }
  }

  private doCommunityTask(card: CommunityChest, playerId: string) {
    let player = getPlayerById(playerId, this.players);

    // TODO:
    switch (card.getId()) {
      case 'community-101': // Advance to "Go". (Collect $200)
        break;
      case 'community-102': // Collect $100
        this.bank.collectMoney(playerId, 100);
        break;
      case 'community-103': // Get Out of Jail Free
        const cardIdx = this.communityChestCards.findIndex(
          (c: CommunityChest) => c.getId() == card.getId()
        );
        let cardToSave = this.communityChestCards.splice(
          cardIdx,
          1
        );
        player.communityChestCards.push(...cardToSave);
        break;
      case 'community-104': // Collect $10
        this.bank.collectMoney(playerId, 10);
        break
      case 'community-105': // Collect $200
        this.bank.collectMoney(playerId, 200);
        break;
      case 'community-106': // get $50
        this.bank.collectMoney(playerId, 50);
        break
      case 'community-107': // Collect $20
        this.bank.collectMoney(playerId, 20);
        break
      case 'community-108': // Receive for services $25.
        this.bank.collectMoney(playerId, 25);
        break;
      case 'community-109': // You inherit $100
        this.bank.collectMoney(playerId, 100);
        break;
      case 'community-110': // Collect $100
        this.bank.collectMoney(playerId, 100);
        break;
      case 'community-111': // Collect $50 from every player for opening night seats
        this.players.forEach((p: Player) => {
          if (p.getId() != player.getId()) {
            p.decreaseBalance(50);
            player.increaseBalance(50);
          }
        });
        break;
      case 'community-112': // Pay $50
        this.bank.payMoney(playerId, 50);
        break;
      case 'community-113': // Pay hospital $100
        this.bank.payMoney(playerId, 100);
        break;
      case 'community-114': // Pay school tax of $150
        this.bank.payMoney(playerId, 150);
        break;
      case 'community-115': // You are assessed for street repairs: Pay $40 per house and $115 per hotel you own
        let homeCount = 0;
        let hotelCount = 0;
        player.propertyCards.forEach((card: PropertyCard) => {
          if (card.hasHotel()) {
            hotelCount++;
          }
          else {
            homeCount += card.getNumberOfHouses();
          }
        })
        player.decreaseBalance(homeCount * 40);
        player.decreaseBalance(hotelCount * 115);
        break;
      case 'community-116': // Go to Jail
        this.goToJail(playerId);
        break;
      default:
        console.log("Community task card not found");
    }
  }
}