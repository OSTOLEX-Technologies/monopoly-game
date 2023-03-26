import {Player} from "./Player";
import {PropertyCard} from "./Cards/PropertyCard";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {CommunityChest} from "./Cards/CommunityChest";
import {ChanceCard} from "./Cards/ChanceCard";
import {Tile} from "./Tiles/Tile";
import {
  cmpsOrder, getChanceCards,
  getCommunityChestCards,
  getPropertyCards,
  getRailroadsCards,
  getTiles,
  getUtilitiesCards,
  tokens
} from "./GameConfig";
import {Bank} from "./Bank";

export class Board {
  public tokens: ReadonlyArray<{ name: string }>;
  public cmpsOrder: ReadonlyArray<string>;
  private doubleCount: number;
  private currentDice: Array<number>;
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
    this.doubleCount = 0;
    this.currentPlayer = players[0];
    this.players = players;
    this.currentDice = new Array<number>();
    this.bank = bank;
  }

  public doStep(newPosition: number, currentDice: Array<number>, playerIdx: number) {
    let currPosition = this.currentPlayer.getPosition();
    let playerToStep = this.currentPlayer;
    const isInJail = this.players[playerIdx].getStepsInJail();
    let isDouble;
    if (currentDice?.length) {
      isDouble = currentDice[0] === currentDice[1];
    }

    if (isInJail) {
      this.players[playerIdx].increaseStepsInJail();
      if (isDouble) {
        this.getOutOfJail(playerIdx);
        this.doStep(newPosition, currentDice, playerIdx);
      }
      return;
    }

    if (isDouble){
      this.doubleCount++;
    }

    if (newPosition >= 0 && currPosition > newPosition) {
      this.bank.collectMoney(playerIdx, 200);
      currPosition = this.currentPlayer.getPosition();
      playerToStep = this.currentPlayer;
      playerIdx = this.players.findIndex(
        (player: Player) => player.getId() == playerToStep.getId()
      );
    }

    // Remove player from last pos:
    this.tiles[currPosition].removePlayer(playerToStep.getId());

    playerToStep.setPosition(newPosition);

    // place player in new pos:
    this.tiles[newPosition].addPlayer(playerToStep);
    this.players[playerIdx].setPosition(newPosition);
  }

  goToJail(playerIdx: number) {
    this.currentDice = new Array<number>();
    this.doubleCount = 0;
    this.players[playerIdx].setStepsInJail(3);
  }

  getOutOfJail(playerIdx: number) {
    this.doubleCount = 0;
    this.players[playerIdx].setStepsInJail(0);
  }

  doChanceTask(card: ChanceCard, currentDice: Array<number>, playerIdx: number) {
    let newPosition;
    let currPosition;

    switch (card.getId()) {
      case 'chance-201': // Advance to "Go". (Collect $200)
        this.doStep(0, currentDice, playerIdx);
        break;
      case 'chance-202': // Advance to Illinois Ave. {Avenue}. If you pass Go, collect $200.
        this.doStep(24, currentDice, playerIdx);
        break;
      case 'chance-203': // Advance to St. Charles Place. If you pass Go, collect $200
        if (this.currentPlayer.getPosition() > 35) {
          this.bank.collectMoney(playerIdx, 200);
        }
        this.doStep(11, currentDice, playerIdx);
        break;
      case 'chance-204': // Advance token to the nearest Utility
        currPosition = this.currentPlayer.getPosition();
        if (currPosition === 7) {
          newPosition = 12;
        } else {
          newPosition = 28;
        }
        this.doStep(newPosition, currentDice, playerIdx);
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
        this.doStep(newPosition, currentDice, playerIdx);
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
        this.doStep(posBack, currentDice, playerIdx);
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
        this.doStep(5, currentDice, playerIdx);
        break;
      case 'chance-213': // Advance token to Boardwalk
        this.doStep(39, currentDice, playerIdx);
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

  doCommunityTask(card: CommunityChest, currentDice: Array<number>) {
    const playerId = this.currentPlayer.getId();
    const playerIdx = this.players.findIndex(
      (player: Player) => player.getId() == playerId
    );

    switch (card.getId()) {
      case 'community-101': // Advance to "Go". (Collect $200)
        this.doStep(0, currentDice, playerIdx);
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
        this.players[playerIdx].communityChestCards.push(...cardToSave);
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
        const currPlayer = this.players[playerIdx];
        this.players.forEach((player: Player) => {
          if (player.getId() != currPlayer.getId()) {
            player.decreaseBalance(50);
            this.players[playerIdx].increaseBalance(50);
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
        this.players[playerIdx].propertyCards.forEach((card: PropertyCard) => {
          if (card.hasHotel()) {
            hotelCount++;
          }
          else {
            homeCount += card.getNumberOfHouses();
          }
        })
        this.players[playerIdx].decreaseBalance(homeCount * 40);
        this.players[playerIdx].decreaseBalance(hotelCount * 115);
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