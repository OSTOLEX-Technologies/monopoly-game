import {ITransaction} from "./Transaction/ITransaction";
import {Tile} from "./Tiles/Tile";
import {Player} from "./Player";
import {PropertyCard} from "./Cards/PropertyCard";
import {RailroadTile} from "./Tiles/RailroadTile";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {CityTile} from "./Tiles/CityTile";
import {UtilityTile} from "./Tiles/UtilityTile";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {getPropertyCards, getRailroadsCards, getUtilitiesCards} from "./GameConfig";

export class Bank {
  private tiles: Array<Tile>;
  private players: Array<Player>;
  private propertyCards: Array<PropertyCard>;
  private railroadsCards: Array<RailroadsCard>;
  private utilitiesCards: Array<UtilitiesCard>;

  constructor(tiles: Array<Tile>, players: Array<Player>) {
    this.tiles = tiles;
    this.players = players;
    this.propertyCards = getPropertyCards();
    this.railroadsCards = getRailroadsCards();
    this.utilitiesCards = getUtilitiesCards();
  }

  public trade(transaction: ITransaction) {

  }

  public collectMoney(playerIdx: number, amount: number) {
    this.players[playerIdx].increaseBalance(amount);
  }

  public payMoney(playerIdx: number, amount: number) {
    this.players[playerIdx].decreaseBalance(amount);
  }

  public buyHouse(cardId: string, playerIdx: number) {
    const cardIdx = this.players[playerIdx].propertyCards.findIndex(
      (card: PropertyCard) => cardId === card.getId()
    );
    const cardPlayer = this.players[playerIdx].propertyCards[cardIdx];

    if (cardPlayer.hasHotel()) {
      console.log('you already have hotel')
      return;
    } else if (cardPlayer.hasFourHouses()) {
      this.players[playerIdx].decreaseBalance(cardPlayer.getHotelCost());
    } else {
      this.players[playerIdx].decreaseBalance(cardPlayer.getHouseCost());
    }

    cardPlayer.increaseHouses();
  }

  buyPropertyCard(player: Player, cardId: string, playerIdx: number) {
    const playerPos = player.getPosition();
    const cardIdx = this.propertyCards.findIndex(
      (card: PropertyCard) => card.getId() == cardId
    );
    let cardToBuy = this.propertyCards.splice(cardIdx, 1);
    this.players[playerIdx].decreaseBalance(cardToBuy[0].getPrice());
    this.players[playerIdx].propertyCards.push(...cardToBuy);
    this.tiles[playerPos].setOwner(player);
  }

  buyRailroadCard(player: Player, cardId: string, playerIdx: number) {
    const position = player.getPosition();
    const cardIdx = this.railroadsCards.findIndex(
      (card: RailroadsCard) => card.getId() === cardId
    );
    let cardToBuy = this.railroadsCards.splice(cardIdx, 1);
    this.players[playerIdx].decreaseBalance(cardToBuy[0].getPrice());
    this.players[playerIdx].railroadsCards.push(...cardToBuy);
    this.tiles[position].setOwner(player);
  }

  buyUtilityCard(player: Player, cardId: string, playerIdx: number) {
    const position = player.getPosition();
    const cardIdx = this.utilitiesCards.findIndex(
      (card: UtilitiesCard) => card.getId() == cardId
    );
    let cardToBuy = this.utilitiesCards.splice(cardIdx, 1);
    this.players[playerIdx].decreaseBalance(cardToBuy[0].getPrice());
    this.players[playerIdx].utilitiesCards.push(...cardToBuy);
    this.tiles[position].setOwner(player);
  }

  private payRent(player: Player, dice: Array<number>, currTile: Tile, playerId: string) {
    const ownerId = currTile.getOwnerId();
    const ownerIdx = this.players.findIndex(
      (p: Player) => p.getId() == ownerId
    );

    const playerIdx = this.players.findIndex(
      (p: Player) => p.getId() == playerId
    );

    let amountToPay = 0;
    let card;

    if (currTile instanceof RailroadTile) {
      const cardIdx = this.players[ownerIdx].railroadsCards.findIndex(
        (card: RailroadsCard) => {
          return card.getTitle() == currTile.getName();
        }
      );
      const quantityOfCards =
        this.players[ownerIdx].railroadsCards.length;
      card = this.players[ownerIdx].railroadsCards[cardIdx];
      amountToPay = card.getRent(quantityOfCards);
    } else if (currTile instanceof CityTile) {
      const cardIdx = this.players[ownerIdx].propertyCards.findIndex(
        (card: PropertyCard) => {
          return card.getTitle() == currTile.getName();
        }
      );
      card = this.players[ownerIdx].propertyCards[cardIdx];
      amountToPay = card.getRent();
    } else if (currTile instanceof UtilityTile) {
      const quantityOfCards =
        this.players[ownerIdx].utilitiesCards.length;

      if (quantityOfCards === 1) {
        return this.payByDice(player, dice, 4, this.players[ownerIdx]);
      } else {
        return this.payByDice(player, dice, 10, this.players[ownerIdx]);
      }
    }

    this.players[playerIdx].decreaseBalance(amountToPay);
    this.players[ownerIdx].increaseBalance(amountToPay);

    return amountToPay;
  }

  public payByDice(player: Player, dice: Array<number>, times: number, payTo: Player) {
    const currPlayerIdx = this.players.findIndex(
      (p: Player) => p.getId() == player.getId()
    );
    const playerToPayIdx = this.players.findIndex(
      (p: Player) => p.getId() == payTo.getId()
    );
    const amount = (dice[0] + dice[1]) * times;
    this.players[currPlayerIdx].decreaseBalance(amount);
    this.players[playerToPayIdx].increaseBalance(amount);
    player.setIsNextPayByDice({isTrue: false, payTo: null});
    return amount;
  }
}