import {Board} from "./Board";
import {Player} from "./Player";
import {PropertyCard} from "./Cards/PropertyCard";
import {CommunityChestCard} from "./Cards/CommunityChest-card";
import {ChanceCard} from "./Cards/ChanceCard";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {Tile} from "./Tiles/Tile";
import {RailroadTile} from "./Tiles/RailroadTile";
import {CityTile} from "./Tiles/CityTile";
import {UtilityTile} from "./Tiles/UtilityTile";

export class Game {
  board: Board;
  currentDice: Array<number> | null;

  constructor(players: Array<Player>) {
    this.board = new Board(players);
    this.currentDice = null;
  }

  doSteps(newPosition: number, currentDice: Array<number>, playerIdx: number) {
    let currPosition = this.board.currentPlayer.position;
    let playerToStep = this.board.currentPlayer;
    const isInJail = this.board.players[playerIdx].isInJail;
    let isDouble;
    if (currentDice?.length) {
      isDouble = currentDice[0] === currentDice[1];
    }

    if (isInJail) {
      this.board.players[playerIdx].isInJail--;
      if (isDouble) {
        this.getOutOfJail(playerIdx);
        this.doSteps(newPosition, currentDice, playerIdx);
      }
      return;
    }

    if (isDouble){
      this.board.doubleCount++;
    }

    if (newPosition >= 0 && currPosition > newPosition) {
      this.collectMoney(playerIdx, 200);
      currPosition = this.board.currentPlayer.position;
      playerToStep = this.board.currentPlayer;
      playerIdx = this.board.players.findIndex(
        (player: Player) => player.id === playerToStep.id
      );
    }

    // Remove player from last pos:
    this.board.tiles[currPosition].players = this.board.tiles[
      currPosition
      ].players.filter((player: Player) => playerToStep.id !== player.id);

    playerToStep.position = newPosition;

    // place player in new pos:
    this.board.tiles[newPosition].players.push(playerToStep);
    this.board.players[playerIdx].position = newPosition;
  }

  goToJail(playerIdx: number) {
      this.board.currentDice = new Array<number>();
      this.board.doubleCount = 0;
      this.board.players[playerIdx].isInJail = 3
  }

  getOutOfJail(playerIdx: number) {
    this.board.doubleCount = 0
    this.board.players[playerIdx].isInJail = 0
  }

  collectMoney(playerIdx: number, amount: number) {
    this.board.players[playerIdx].balance += amount
  }

  payMoney(playerIdx: number, amount: number) {
    this.board.players[playerIdx].balance -= amount
  }

  payTax(playerIdx: number, pay: number) {
    this.board.players[playerIdx].balance -= pay
  }

  buyPropertyCard(cardId: string, playerIdx: number) {
    const playerPos = this.board.currentPlayer.position;
    const cardIdx = this.board.propertyCards.findIndex(
      (card: PropertyCard) => card.id === cardId
    );
    let cardToBuy = this.board.propertyCards.splice(cardIdx, 1);
    this.board.players[playerIdx].balance -= cardToBuy[0].price;
    this.board.players[playerIdx].propertyCards.push(...cardToBuy);
    this.board.tiles[playerPos].owner = this.board.getCurrentPlayer();
  }

  buyRailroadCard(cardId: string, playerIdx: number) {
    const position = this.board.currentPlayer.position;
    const cardIdx = this.board.railroadsCards.findIndex(
      (card: RailroadsCard) => card.id === cardId
    );
    let cardToBuy = this.board.railroadsCards.splice(cardIdx, 1);
    this.board.players[playerIdx].balance -= cardToBuy[0].price;
    this.board.players[playerIdx].railroadsCards.push(...cardToBuy);
    this.board.tiles[position].owner = this.board.getCurrentPlayer();
  }

  buyUtilityCard(cardId: string, playerIdx: number) {
    const position = this.board.currentPlayer.position;
    const cardIdx = this.board.utilitiesCards.findIndex(
      (card: UtilitiesCard) => card.id === cardId
    );
    let cardToBuy = this.board.utilitiesCards.splice(cardIdx, 1);
    this.board.players[playerIdx].balance -= cardToBuy[0].price;
    this.board.players[playerIdx].utilitiesCards.push(...cardToBuy);
    this.board.tiles[position].owner = this.board.getCurrentPlayer();
  }

  payByDice(times: number, payTo: Player): number {
    const currPlayerIdx = this.board.players.findIndex(
      (player: Player) => player.id === this.board.currentPlayer.id
    )
    const playerToPayIdx = this.board.players.findIndex(
      (player: Player) => player.id === payTo.id
    )
    const amount = (this.board.currentDice[0] + this.board.currentDice[1]) * times
    this.board.players[currPlayerIdx].balance -= amount
    this.board.players[playerToPayIdx].balance += amount
    this.board.currentPlayer.isNextPayByDice = {isTrue: false, payTo: null};
    return amount;
  }

  doChanceTask(card: ChanceCard, currentDice: Array<number>, playerIdx: number) {
    let newPosition;
    let currPosition;

    switch (card.id) {
      case 'chance-201': // Advance to "Go". (Collect $200)
        this.doSteps(0, currentDice, playerIdx);
        break;
      case 'chance-202': // Advance to Illinois Ave. {Avenue}. If you pass Go, collect $200.
        this.doSteps(24, currentDice, playerIdx);
        break;
      case 'chance-203': // Advance to St. Charles Place. If you pass Go, collect $200
        if (this.board.currentPlayer.position > 35) {
          this.collectMoney(playerIdx, 200);
        }
        this.doSteps(11, currentDice, playerIdx);
        break;
      case 'chance-204': // Advance token to the nearest Utility
        currPosition = this.board.currentPlayer.position;
        if (currPosition === 7) {
          newPosition = 12;
        } else {
          newPosition = 28;
        }
        this.doSteps(newPosition, currentDice, playerIdx);
        this.board.currentPlayer.isNextPayByDice = { isTrue: true, payTo: null }
        break;
      case 'chance-205': // Advance to the nearest Railroad
        currPosition = this.board.currentPlayer.position;
        if (currPosition === 7) {
          newPosition = 15;
        } else if (currPosition === 22) {
          newPosition = 25;
        } else {
          newPosition = 5;
        }
        this.doSteps(newPosition, currentDice, playerIdx);
        this.board.currentPlayer.isNextPayByDice = { isTrue: true, payTo: null };
        break;
      case 'chance-206': // Bank pays you dividend of $50
        this.collectMoney(playerIdx, 20);
        break;
      case 'chance-207': // Get out of Jail Free
        const cardIdx = this.board.chanceCards.findIndex(
          (c: ChanceCard) => c.id === card.id
        );
        let cardToSave = this.board.chanceCards.splice(cardIdx, 1);
        this.board.players[playerIdx].chanceCards.push(...cardToSave);
        break;
      case 'chance-208': // Go Back 3 Spaces
        const posBack = this.board.currentPlayer.position - 3;
        this.doSteps(posBack, currentDice, playerIdx);
        break;
      case 'chance-209': // Go to Jail
        this.goToJail(playerIdx);
        break;
      case 'chance-210': // Make general repairs on all your property
        let homeCount = 0;
        let hotelCount = 0;
        this.board.players[playerIdx].propertyCards.forEach((card: PropertyCard) => {
          if (card.houses > 4) {
            hotelCount++;
          }
          if (card.houses < 5) {
            homeCount += card.houses;
          }
        });
        this.board.players[playerIdx].balance -= homeCount * 25;
        this.board.players[playerIdx].balance -= hotelCount * 100;
        break;
      case 'chance-211': // Pay poor tax of $15
        this.payMoney(playerIdx, 15);
        break;
      case 'chance-212': // collect $200
        const playerPos = this.board.players[playerIdx].position;
        if (playerPos > 5) {
          this.board.players[playerIdx].balance += 200;
        }
        this.doSteps(5, currentDice, playerIdx);
        break;
      case 'chance-213': // Advance token to Boardwalk
        this.doSteps(39, currentDice, playerIdx);
        break;
      case 'chance-214': // PAY EACH PLAYER $50
        const currPlayer = this.board.players[playerIdx];
        this.board.players.forEach((player: Player) => {
          if (player.id !== currPlayer.id) {
            player.balance += 50;
            this.board.players[playerIdx].balance -= 50;
          }
        });
        break;
      case 'chance-215':
        this.collectMoney(playerIdx, 150);
        break;
      case 'chance-216':
        this.collectMoney(playerIdx, 100);
        break;
      default:
        console.log("Chance card not found");
    }
  }

  doCommunityTask(card: CommunityChestCard, currentDice: Array<number>) {
    const playerId = this.board.currentPlayer.id;
    const playerIdx = this.board.players.findIndex(
      (player: Player) => player.id === playerId
    );

    switch (card.id) {
      case 'community-101': // Advance to "Go". (Collect $200)
        this.doSteps(0, currentDice, playerIdx);
        break;
      case 'community-102': // Collect $100
        this.collectMoney(playerIdx, 100);
        break;
      case 'community-103': // Get Out of Jail Free
        const cardIdx = this.board.communityChestCards.findIndex(
          (c: CommunityChestCard) => c.id === card.id
        );
        let cardToSave = this.board.communityChestCards.splice(
          cardIdx,
          1
        );
        this.board.players[playerIdx].communityChestCards.push(...cardToSave);
        break;
      case 'community-104': // Collect $10
        this.collectMoney(playerIdx, 10);
        break
      case 'community-105': // Collect $200
        this.collectMoney(playerIdx, 200);
        break;
      case 'community-106': // get $50
        this.collectMoney(playerIdx, 50);
        break
      case 'community-107': // Collect $20
        this.collectMoney(playerIdx, 20);
        break
      case 'community-108': // Receive for services $25.
        this.collectMoney(playerIdx, 25);
        break;
      case 'community-109': // You inherit $100
        this.collectMoney(playerIdx, 100);
        break;
      case 'community-110': // Collect $100
        this.collectMoney(playerIdx, 100);
        break;
      case 'community-111': // Collect $50 from every player for opening night seats
        const currPlayer = this.board.players[playerIdx];
        this.board.players.forEach((player: Player) => {
          if (player.id !== currPlayer.id) {
            player.balance -= 50;
            this.board.players[playerIdx].balance += 50;
          }
        });
        break;
      case 'community-112': // Pay $50
        this.payMoney(playerIdx, 50);
        break;
      case 'community-113': // Pay hospital $100
        this.payMoney(playerIdx, 100);
        break;
      case 'community-114': // Pay school tax of $150
        this.payMoney(playerIdx, 150);
        break;
      case 'community-115': // You are assessed for street repairs: Pay $40 per house and $115 per hotel you own
        let homeCount = 0;
        let hotelCount = 0;
        this.board.players[playerIdx].propertyCards.forEach((card: PropertyCard) => {
          if (card.houses > 4) hotelCount++;
          if (card.houses < 5) homeCount += card.houses;
        })
        this.board.players[playerIdx].balance -= homeCount * 40
        this.board.players[playerIdx].balance -= hotelCount * 115
        break;
      case 'community-116': // Go to Jail
        this.goToJail(playerIdx);
        break;
      default:
        console.log("Community task card not found");
    }
  }

  buyHouse(cardId: string, playerIdx: number) {
    const cardIdx = this.board.players[playerIdx].propertyCards.findIndex(
      (card: PropertyCard) => cardId === card.id
    );
    const cardPlayer = this.board.players[playerIdx].propertyCards[cardIdx];
    const hasHotel = cardPlayer.houses === 5;
    const hasHouses = cardPlayer.houses > 4;
    if (hasHotel) {
      console.log('you already have hotel')
      return;
    } else if (hasHouses) {
      this.board.players[playerIdx].balance -= cardPlayer.hotelCost;
    } else {
      this.board.players[playerIdx].balance -= cardPlayer.houseCost;
    }
    cardPlayer.houses++;
  }

  payRent(currTile: Tile) {
    const ownerId = currTile.getOwnerId();
    const ownerIdx = this.board.players.findIndex(
      (player: Player) => player.id === ownerId
    );

    let playerId = this.board.currentPlayer.id;
    const playerIdx = this.board.players.findIndex(
      (player: Player) => player.id === playerId
    );

    let amountToPay = 0;
    let card;

    if (currTile instanceof RailroadTile) {
      const cardIdx = this.board.players[ownerIdx].railroadsCards.findIndex(
        (card: RailroadsCard) => {
          return card.title === currTile.name;
        }
      );
      const quantityOfCards =
        this.board.players[ownerIdx].railroadsCards.length;
      card = this.board.players[ownerIdx].railroadsCards[cardIdx];

      if (quantityOfCards === 1) {
        amountToPay = card.rent;
      } else if (quantityOfCards === 2) {
        amountToPay = card.ifTwoCards;
      } else if (quantityOfCards === 3) {
        amountToPay = card.ifThreeCards;
      } else if (quantityOfCards === 4) {
        amountToPay = card.ifFourCards;
      }
    } else if (currTile instanceof CityTile) {
      const cardIdx = this.board.players[ownerIdx].propertyCards.findIndex(
        (card: PropertyCard) => {
          return card.title === currTile.name;
        }
      );
      card = this.board.players[ownerIdx].propertyCards[cardIdx];

      if (card.houses === 0) {
        amountToPay = card.rent;
      } else if (card.houses === 1) {
        amountToPay = card.oneHouse;
      } else if (card.houses === 2) {
        amountToPay = card.twoHouses;
      } else if (card.houses === 3) {
        amountToPay = card.threeHouses;
      } else if (card.houses === 4) {
        amountToPay = card.fourHouses;
      }
    } else if (currTile instanceof UtilityTile) {
      const quantityOfCards =
        this.board.players[ownerIdx].utilitiesCards.length;

      if (quantityOfCards === 1) {
        return this.payByDice(4, this.board.players[ownerIdx]);
      } else {
        return this.payByDice(10, this.board.players[ownerIdx]);
      }
    }

    this.board.players[playerIdx].balance -= amountToPay;
    this.board.players[ownerIdx].balance += amountToPay;

    return amountToPay;
  }
}