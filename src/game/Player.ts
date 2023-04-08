import {PropertyCard} from "./Cards/PropertyCard";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {ChanceCard} from "./Cards/ChanceCard";
import {CommunityChestCard} from "./Cards/CommunityChestCard";

export class Player {
  public readonly id: string;
  public readonly color: string;
  private name: string;
  private balance: number;
  private position: number;
  private stepsInJail: number;
  public propertyCards: Array<PropertyCard>;
  public railroadsCards: Array<RailroadsCard>;
  public utilitiesCards: Array<UtilitiesCard>;
  public chanceCards: Array<ChanceCard>;
  public communityChestCards: Array<CommunityChestCard>;
  private isNextPayByDice: {isTrue: boolean, payTo: Player | null};

  constructor(id: string, color: string, name: string, balance: number, position: number) {
    this.id = id;
    this.color = color;
    this.name = name;
    this.balance = balance;
    this.position = position;
    this.stepsInJail = 0;
    this.propertyCards = new Array<PropertyCard>();
    this.railroadsCards = new Array<RailroadsCard>();
    this.utilitiesCards = new Array<UtilitiesCard>();
    this.chanceCards = new Array<ChanceCard>();
    this.communityChestCards = new Array<CommunityChestCard>();
    this.isNextPayByDice = {isTrue: false, payTo: null};
  }

  public setIsNextPayByDice(isNextPayByDice: {isTrue: boolean, payTo: Player | null}) {
    this.isNextPayByDice = isNextPayByDice;
  }

  public getId(): string {
    return this.id;
  }

  public getPosition(): number {
    return this.position;
  }

  public setPosition(position: number) {
    this.position = position;
  }

  public getStepsInJail(): number {
    return this.stepsInJail;
  }

  public setStepsInJail(numberOfSteps: number) {
    this.stepsInJail = numberOfSteps;
  }

  public increaseStepsInJail() {
    this.stepsInJail--;
  }

  public getBalance() {
    return this.balance;
  }

  public increaseBalance(amount: number) {
    this.balance += amount;
  }

  public decreaseBalance(amount: number) {
    this.balance -= amount;
  }
}