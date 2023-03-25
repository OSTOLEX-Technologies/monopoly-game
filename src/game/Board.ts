import {Player} from "./Player";
import {PropertyCard} from "./Cards/PropertyCard";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {CommunityChestCard} from "./Cards/CommunityChest-card";
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

export class Board {
  public tokens: ReadonlyArray<{ name: string }>;
  public cmpsOrder: ReadonlyArray<string>;
  houses: number;
  hotels: number;
  doubleCount: number;
  currentDice: Array<number>;
  currentPlayer: Player;
  players: Array<Player>;
  propertyCards: Array<PropertyCard>;
  utilitiesCards: Array<UtilitiesCard>;
  railroadsCards: Array<RailroadsCard>;
  communityChestCards: Array<CommunityChestCard>;
  chanceCards: Array<ChanceCard>;
  tiles: Array<Tile>;

  constructor(players: Array<Player>) {
    this.tokens = tokens;
    this.tiles = getTiles(players);
    this.cmpsOrder = cmpsOrder;
    this.propertyCards = getPropertyCards();
    this.utilitiesCards = getUtilitiesCards();
    this.railroadsCards = getRailroadsCards();
    this.communityChestCards = getCommunityChestCards();
    this.chanceCards = getChanceCards();
    this.houses = 32;
    this.hotels = 12;
    this.doubleCount = 0;
    this.currentPlayer = players[0];
    this.players = players;
    this.currentDice = new Array<number>();
  }

  public getCurrentPlayer() : Player {
    return this.getPlayerById(this.currentPlayer.id);
  }

  public getPlayerById(playerId: string): Player {
    let result = this.players.find((x) => x.id == playerId);

    if (result != undefined) {
      return result;
    }

    throw new Error("Player with id " + playerId + " not found");
  }

  public increasePlayerBalance(playerId: string, amount: number) {

  }

  public decreasePlayerBalance(playerId: string, amount: number) {
  }
}