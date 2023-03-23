class Player {
  id: string;
  name: string;
  balance: number;
  position: number;
  isInJail: number;
  propertyCards: Array<any>;
  railroadsCards: Array<any>;
  utilitiesCards: Array<any>;
  chanceCards: Array<any>;
  communityChestCards: Array<any>;
  isNextPayByDice: {isTrue: boolean, payTo: Player | null};

  constructor(id: string, name: string, balance: number, position: number) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.position = position;
    this.isInJail = 0;
    this.propertyCards = new Array<any>();
    this.railroadsCards = new Array<any>();
    this.utilitiesCards = new Array<any>();
    this.chanceCards = new Array<any>();
    this.communityChestCards = new Array<any>();
    this.isNextPayByDice = {isTrue: false, payTo: null};
  }
}

export default Player;