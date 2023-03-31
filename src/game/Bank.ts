import {IOffer} from "./Offers/IOffer";
import {Tile} from "./Tiles/Tile";
import {Player} from "./Player";
import {PropertyCard} from "./Cards/PropertyCard";
import {RailroadTile} from "./Tiles/RailroadTile";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {CityTile} from "./Tiles/CityTile";
import {UtilityTile} from "./Tiles/UtilityTile";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {getPropertyCards, getRailroadsCards, getUtilitiesCards} from "./GameConfig";
import {getPlayerById} from "./Utils";

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

    this.deletePurchasedCards();
  }

  private deletePurchasedCards() {
    this.players.forEach((player) => {
      player.propertyCards.forEach((propertyCard) => {
        this.removePropertyCardById(propertyCard.getId());
      });
      player.railroadsCards.forEach((railroadsCard) => {
        this.removeRailroadCardById(railroadsCard.getId());
      });
      player.utilitiesCards.forEach((utilitiesCard) => {
        this.removeUtilityCard(utilitiesCard.getId());
      });
    });
  }

  public trade(transaction: IOffer) {

  }

  public collectMoney(playerId: string, amount: number) {
    let player = getPlayerById(playerId, this.players);
    player.increaseBalance(amount);
  }

  public payMoney(from: string, to: string, amount: number) {
    if (from == "bank") {
      this.collectMoney(to, amount);
      return;
    }

    if (to != "bank") {
      let toPlayer = getPlayerById(to, this.players);
      toPlayer.increaseBalance(amount);
    }

    let player = getPlayerById(from, this.players);
    player.decreaseBalance(amount);
  }

  public buyHouse(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const cardIdx = player.propertyCards.findIndex(
      (card: PropertyCard) => cardId === card.getId()
    );
    const cardPlayer = player.propertyCards[cardIdx];

    if (cardPlayer.hasHotel()) {
      console.log('you already have hotel')
      return;
    } else if (cardPlayer.hasFourHouses()) {
      player.decreaseBalance(cardPlayer.getHotelCost());
    } else {
      player.decreaseBalance(cardPlayer.getHouseCost());
    }

    cardPlayer.increaseHouses();
  }

  public buyPropertyCard(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const playerPos = player.getPosition();
    const cardToBuy = this.removePropertyCardById(cardId);
    player.decreaseBalance(cardToBuy[0].getPrice());
    player.propertyCards.push(...cardToBuy);
    this.tiles[playerPos].setOwner(player);
  }

  private removePropertyCardById(cardId: string): Array<PropertyCard> {
    const cardIdx = this.propertyCards.findIndex(
      (card: PropertyCard) => card.getId() == cardId
    );
    return this.propertyCards.splice(cardIdx, 1);
  }

  public buyRailroadCard(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const position = player.getPosition();
    let cardToBuy = this.removeRailroadCardById(cardId);
    player.decreaseBalance(cardToBuy[0].getPrice());
    player.railroadsCards.push(...cardToBuy);
    this.tiles[position].setOwner(player);
  }

  private removeRailroadCardById(cardId: string): Array<RailroadsCard> {
    const cardIdx = this.railroadsCards.findIndex(
      (card: RailroadsCard) => card.getId() == cardId
    );
    return this.railroadsCards.splice(cardIdx, 1);
  }

  public buyUtilityCard(cardId: string, playerId: string) {
    let player = getPlayerById(playerId, this.players);
    const position = player.getPosition();
    let cardToBuy = this.removeUtilityCard(cardId);
    player.decreaseBalance(cardToBuy[0].getPrice());
    player.utilitiesCards.push(...cardToBuy);
    this.tiles[position].setOwner(player);
  }

  private removeUtilityCard(cardId: string): Array<UtilitiesCard> {
    const cardIdx = this.utilitiesCards.findIndex(
      (card: UtilitiesCard) => card.getId() == cardId
    );
    return this.utilitiesCards.splice(cardIdx, 1);
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