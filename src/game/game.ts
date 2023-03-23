import Board from "./board";
import Player from "./player";

class Game {
  board: Board;
  currentDice: any;

  constructor(players: any) {
    this.board = new Board(players);
  }

  doSteps(newPosition: any, currentDice: any, playerIdx: number) {
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
      ].players.filter((player: Player) => playerToStep._id !== player.id);

    playerToStep.position = newPosition;

    // place player in new pos:
    this.board.tiles[newPosition].players.push(playerToStep);
    this.board.players[playerIdx].position = newPosition;
  }

  goToJail(playerIdx: number) {
      this.board.currentDice = null;
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
    const cardIdx = this.board.cards.propertyCards.findIndex(
      (card: any) => card.id === cardId
    );
    let cardToBuy = this.board.cards.propertyCards.splice(cardIdx, 1);
    this.board.players[playerIdx].balance -= cardToBuy[0].price;
    this.board.players[playerIdx].propertyCards.push(...cardToBuy);
    this.board.tiles[playerPos].owner = {
      name: this.board.currentPlayer.name,
      _id: this.board.currentPlayer._id,
    };
  }

  buyRailroadCard(cardId: string, playerIdx: number) {
    const position = this.board.currentPlayer.position;
    const cardIdx = this.board.cards.railroadsCards.findIndex(
      (card: any) => card._id === cardId
    );
    let cardToBuy = this.board.cards.railroadsCards.splice(cardIdx, 1);
    this.board.players[playerIdx].balance -= cardToBuy[0].price;
    this.board.players[playerIdx].railroadsCards.push(...cardToBuy);
    this.board.tiles[position].owner = {
      name: this.board.currentPlayer.name,
      _id: this.board.currentPlayer.id,
    };
  }

  buyUtilityCard(cardId: string, playerIdx: number) {
    const position = this.board.currentPlayer.position;
    const cardIdx = this.board.cards.utilitiesCards.findIndex(
      (card: any) => card.id === cardId
    );
    let cardToBuy = this.board.cards.utilitiesCards.splice(cardIdx, 1);
    this.board.players[playerIdx].balance -= cardToBuy[0].price;
    this.board.players[playerIdx].utilitiesCards.push(...cardToBuy);
    this.board.tiles[position].owner = {
      name: this.board.currentPlayer.name,
      _id: this.board.currentPlayer.id,
    };
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
    this.board.currentPlayer.isNextPayByDice = {}
    return amount;
  }

  doChanceTask(card: any, currentDice: any, playerIdx: number) {
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
        } else if (currPosition === 22) {
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
        } else if (currPosition === 36) {
          newPosition = 5;
        }
        this.doSteps(newPosition, currentDice, playerIdx);
        this.board.currentPlayer.isNextPayByDice = { isTrue: true, payTo: null };
        break;
      case 'chance-206': // Bank pays you dividend of $50
        this.collectMoney(playerIdx, 20);
        break;
      case 'chance-207': // Get out of Jail Free
        const cardIdx = this.board.cards.chanceCards.findIndex(
          (c: any) => c._id === card._id
        );
        let cardToSave = this.board.cards.chanceCards.splice(cardIdx, 1);
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
        this.board.players[playerIdx].propertyCards.forEach((card: any) => {
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

  doCommunityTask(card: any, currentDice: any) {
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
        const cardIdx = this.board.cards.communityChestCards.findIndex(
          (c: any) => c.id === card.id
        );
        let cardToSave = this.board.cards.communityChestCards.splice(
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
          if (player.id !== currPlayer._id) {
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
        this.board.players[playerIdx].propertyCards.forEach((card: any) => {
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
}

export default Game;