import {PropertyCard} from "./Cards/PropertyCard";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {ChanceCard} from "./Cards/ChanceCard";
import {CommunityChestCard} from "./Cards/CommunityChest-card";

export class Player {
  id: string;
  name: string;
  balance: number;
  position: number;
  isInJail: number;
  propertyCards: Array<PropertyCard>;
  railroadsCards: Array<RailroadsCard>;
  utilitiesCards: Array<UtilitiesCard>;
  chanceCards: Array<ChanceCard>;
  communityChestCards: Array<CommunityChestCard>;
  isNextPayByDice: {isTrue: boolean, payTo: Player | null};

  constructor(id: string, name: string, balance: number, position: number) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.position = position;
    this.isInJail = 0;
    this.propertyCards = new Array<PropertyCard>();
    this.railroadsCards = new Array<RailroadsCard>();
    this.utilitiesCards = new Array<UtilitiesCard>();
    this.chanceCards = new Array<ChanceCard>();
    this.communityChestCards = new Array<CommunityChestCard>();
    this.isNextPayByDice = {isTrue: false, payTo: null};
  }
}