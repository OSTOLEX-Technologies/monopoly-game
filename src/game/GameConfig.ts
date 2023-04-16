import {Tile} from "./Tiles/Tile";
import {GoTile} from "./Tiles/GoTile";
import {CityTile} from "./Tiles/CityTile";
import {CommunityChestTile} from "./Tiles/CommunityChestTile";
import {TaxTile} from "./Tiles/TaxTile";
import {RailroadTile} from "./Tiles/RailroadTile";
import {ChanceTile} from "./Tiles/ChanceTile";
import {VisitTile} from "./Tiles/VisitTile";
import {UtilityTile} from "./Tiles/UtilityTile";
import {ParkingTile} from "./Tiles/ParkingTile";
import {JailTile} from "./Tiles/JailTile";
import {PropertyCard} from "./Cards/PropertyCard";
import {UtilitiesCard} from "./Cards/UtilitiesCard";
import {RailroadsCard} from "./Cards/RailroadsCard";
import {CommunityChestCard} from "./Cards/CommunityChestCard";
import {ChanceCard} from "./Cards/ChanceCard";
import {Player} from "./Player";

export const tokens = Object.freeze( [
  {
    name: 'Scottish Terrier',
  },
  {
    name: 'Battleship',
  },
  {
    name: 'race car mid',
  },
  {
    name: 'Top Hat',
  },
  {
    name: 'Penguin',
  },
  {
    name: 'T-Rex',
  },
  {
    name: 'Cat',
  },
  {
    name: 'Rubber Ducky',
  },
]);

export const cmpsOrder = Object.freeze([
  'startCmp',
  'tileCmp',
  'communityCmp',
  'tileCmp',
  'incomeCmp',
  'railroadCmp',
  'tileCmp',
  'chanceCmp',
  'tileCmp',
  'tileCmp',
  'jailCmp',
  'tileCmp',
  'electricCmp',
  'tileCmp',
  'tileCmp',
  'railroadCmp',
  'tileCmp',
  'communityCmp',
  'tileCmp',
  'tileCmp',
  'parkingCmp',
  'tileCmp',
  'chanceCmp',
  'tileCmp',
  'tileCmp',
  'railroadCmp',
  'tileCmp',
  'tileCmp',
  'waterWorkCmp',
  'tileCmp',
  'sendToJailCmp',
  'tileCmp',
  'tileCmp',
  'communityCmp',
  'tileCmp',
  'railroadCmp',
  'chanceCmp',
  'tileCmp',
  'luxuryTaxCmp',
  'tileCmp',
]);

export function getTiles(players: Array<Player>): Array<Tile> {
  let communityCards = getCommunityChestCards();
  players.forEach((player) => {
    player.communityChestCards.forEach((communityCard) => {
      const cardIdx = communityCards.findIndex(
        (card) => card.getId() == communityCard.getId()
       );
      communityCards.splice(cardIdx, 1);
    });
  });

  let chanceCards = getChanceCards();
  players.forEach((player) => {
    player.chanceCards.forEach((chanceCard) => {
      const cardIdx = chanceCards.findIndex(
        (card) => card.getId() == chanceCard.getId()
      );
      chanceCards.splice(cardIdx, 1);
    });
  });

  let result = [
    new GoTile(
      'Go',
      [],
      null,
      60,
    ),
    new CityTile(
      'Paras',
      [],
      null,
      60,
    ),
    new ChanceTile(
        'Chance',
        [],
        chanceCards,
    ),
    new CityTile(
      'Mintbase',
      [],
      null,
      60,
    ),
    new CommunityChestTile(
        'Treasury',
        [],
        communityCards,
    ),
    new CityTile(
        'Calimero',
        [],
        null,
        220,
    ),
    new TaxTile(
      'Your position has been liquidated',
      [],
      null,
      200,
    ),
    new CityTile(
        'Octopus',
        [],
        null,
        220,
    ),
    new VisitTile(
        'Just visiting ',
        [],
        null,
    ),
    new CityTile(
      'Ref.finance',
      [],
      null,
      120,
    ),
    new ChanceTile(
        'Chance',
        [],
        chanceCards,
    ),
    new CityTile(
        'Trisolaris',
        [],
        null,
        100,
    ),
    new RailroadTile(
        'Labor exchange',
        [],
        null,
        200,
    ),
    new UtilityTile(
        'Human Guild',
        [],
        null,
        100,
    ),
    new CommunityChestTile(
        'Treasury',
        [],
        communityCards,
    ),
    new CityTile(
        'Rainbow Bridge',
        [],
        null,
        240,
    ),
    new ParkingTile(
        'Withdrawal is temporarily suspended',
        [],
        null,
    ),
    new CityTile(
        'Aurora',
        [],
        null,
        260,
    ),
    new TaxTile(
        'Sent money to the wrong address',
        [],
        null,
        200,
    ),
    new CityTile(
        'Bastion',
        [],
        null,
        200,
    ),
    new RailroadTile(
        'Hudzilin Pub',
        [],
        null,
        200,
    ),
    new CityTile(
        'Aurigami',
        [],
        null,
        180,
    ),
    new ChanceTile(
        'Chance',
        [],
        chanceCards,
    ),
    new CityTile(
        'Hockey Club Manager',
        [],
        null,
        160,
    ),
    new JailTile(
        'FRS is interested in you',
        [],
        null,
    ),
    new CityTile(
      'Laser chess',
      [],
      null,
      140,
    ),
    new TaxTile(
        'SEC is raising rates',
        [],
        null,
        200,
    ),
    new UtilityTile(
        'Near Ukraine',
        [],
        null,
        100,
    ),
    new RailroadTile(
        'Ilya Polosukhin University',
        [],
        null,
        200,
    ),
    new CityTile(
        'HERE wallet',
        [],
        null,
        280,
    ),
    new CommunityChestTile(
        'Treasury',
        [],
        communityCards,
    ),
    new CityTile(
        'Sender wallet',
        [],
        null,
        260,
    ),
  ];

  players.forEach((player) => {
    result[player.getPosition()].addPlayer(player);
  });

  return result;
}

export function getPropertyCards(): Array<PropertyCard> {
  return  [
    new PropertyCard(
      'property-101',
      'Paras',
      60,
      2,
      10,
      30,
      90,
      160,
      250,
      30,
      50,
      210,
      2,
      0,
      0)
    ,
    new PropertyCard(
      'property-102',
      'Mintbase',
      60,
      4,
      20,
      60,
      180,
      320,
      450,
      30,
      50,
      370,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-103',
      'Trisolaris',
      100,
      6,
      30,
      90,
      270,
      400,
      550,
      50,
      50,
      450,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-104',
      'Ref.finance',
      120,
      8,
      40,
      100,
      300,
      450,
      600,
      60,
      50,
      500,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-105',
      'Laser chess',
      140,
      10,
      50,
      150,
      450,
      625,
      750,
      70,
      100,
      725,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-106',
      'Hockey Club Manager',
      160,
      12,
      60,
      180,
      500,
      700,
      900,
      80,
      100,
      800,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-107',
      'Aurigami',
      180,
      14,
      70,
      200,
      550,
      750,
      950,
      90,
      100,
      850,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-108',
      'Bastion',
      200,
      16,
      80,
      220,
      600,
      800,
      1000,
      100,
      100,
      900,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-109',
      'Octopus',
      220,
      18,
      90,
      250,
      700,
      875,
      1050,
      110,
      150,
      1025,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-110',
      'Calimero',
      220,
      18,
      90,
      250,
      700,
      875,
      1050,
      110,
      150,
      1025,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-111',
      'Rainbow Bridge',
      240,
      20,
      100,
      300,
      750,
      925,
      1100,
      120,
      150,
      1075,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-112',
      'Aurora',
      260,
      22,
      110,
      330,
      800,
      975,
      1150,
      130,
      150,
      1125,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-113',
      'Sender wallet',
      260,
      22,
      110,
      330,
      800,
      975,
      1150,
      130,
      150,
      1125,
      2,
      0,
      0,
    ),
    new PropertyCard(
      'property-114',
      'HERE wallet',
      280,
      24,
      120,
      360,
      850,
      1025,
      1200,
      140,
      150,
      1175,
      2,
      0,
      0,
    ),
  ];
}

export function getRailroadsCards(): Array<RailroadsCard> {
  return  [
    new RailroadsCard(
      'railroad-101',
      'Labor exchange',
      '',
      200,
      25,
      50,
      100,
      200, // TODO: убрать ifFourCards, потому что у нас их всего 3 на доске
      100,
    ),
    new RailroadsCard(
      'railroad-102',
      'Hudzilin Pub',
      '',
      200,
      25,
      50,
      100,
      200,
      100,
    ),
    new RailroadsCard(
      'railroad-103',
      'Polosukhin University',
      '',
      200,
      25,
      50,
      100,
      200,
      100,
    ),
  ];
}

export function getUtilitiesCards(): Array<UtilitiesCard> {
  return  [
    new UtilitiesCard(
        'utility-101',
        'Near UA',
        100,
        '4 * Dice Roll',
        '10 * Dice Roll',
        75,
    ),
    new UtilitiesCard(
        'utility-102',
        'Human Guild',
        140,
        '4 * Dice Roll',
        '10 * Dice Roll',
        75,
    ),
  ];
}

export function getCommunityChestCards(): Array<CommunityChestCard> {
  return  [
    new CommunityChestCard(
      'community-101',
      'Community Chest',
      'Advance to "Go". (Collect $200) ',
    ),
    new CommunityChestCard(
      'community-102',
      'Community Chest',
      'You have won an airdrop - Collect $100 ',
    ),
    new CommunityChestCard(
      'community-103',
      'Community Chest',
      'Get Out of Jail Free. ',
    ),
    new CommunityChestCard(
      'community-104',
      'Community Chest',
      'You`ve been tipped $10. Grab your tips from @nearup_bot. ',
    ),
    new CommunityChestCard(
      'community-105',
      'Community Chest',
      'You find an old laptop with some BTC worth $200. ',
    ),
    new CommunityChestCard(
      'community-106',
      'Community Chest',
      'Get staking rewards $50. ',
    ),
    new CommunityChestCard(
      'community-107',
      'Community Chest',
      'Sold an NFT, get $20 ',
    ),
    new CommunityChestCard(
      'community-108',
      'Community Chest',
      'Get $25 from Near Crowd tasks.',
    ),
    new CommunityChestCard(
      'community-109',
      'Community Chest',
      'Unlock time, get $100.',
    ),
    new CommunityChestCard(
      'community-110',
      'Community Chest',
      'Successful trade, get $100. ',
    ),
    new CommunityChestCard(
      'community-111',
      'Community Chest',
      'Collect $50 from every player. ',
    ),
    new CommunityChestCard(
      'community-112',
      'Community Chest',
      'You bought a crypto course. Pay $50. ',
    ),
    new CommunityChestCard(
      'community-113',
      'Community Chest',
      'Pay hospital  $100 for treatment from trading. ',
    ),
    new CommunityChestCard(
      'community-114',
      'Community Chest',
      'You got liquidated -$150 ',
    ),
    new CommunityChestCard(
      'community-115',
      'Community Chest',
      'Bear market, your assets are loosing value: $40 per regular and $115 per ICO stage. ',
    ),
    new CommunityChestCard(
      'community-116',
      'Community Chest',
      'Go to Jail. ',
    ),
  ];
}

export function getChanceCards(): Array<ChanceCard> {
  return  [
    new ChanceCard(
      'chance-201',
      'Chance',
      'Advance to "Go". (Collect $200).',
    ),
    new ChanceCard(
      'chance-202',
      'Chance',
      'Advance to Calimero. If you pass Go, collect $200.',
    ),
    new ChanceCard(
      'chance-203',
      'Chance',
      'Advance to Ref Finance. If you pass Go, collect $200. ',
    ),
    new ChanceCard(
      'chance-204',
      'Chance',
      'Advance to the nearest Guild. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total 10 (ten) times the amount thrown. ',
    ),
    new ChanceCard(
      'chance-205',
      'Chance',
      'Advance to the nearest Building. If unowned, you may buy it from the Bank. If owned, pay the owner twice the commission. ',
    ),
    new ChanceCard(
      'chance-206',
      'Chance',
      'Get staking rewards $50. ',
    ),
    new ChanceCard(
      'chance-207',
      'Chance',
      'Get out of Jail Free.',
    ),
    new ChanceCard(
      'chance-208',
      'Chance',
      'Go Back 3 Spaces.',
    ),
    new ChanceCard(
      'chance-209',
      'Chance',
      'Go to Jail. Go directly to Jail. Do not pass GO, do not collect $200.',
    ),
    new ChanceCard(
      'chance-210',
      'Chance',
      'Your companies need extra cash: For each project stage pay $25, For each project ICO pay $100.',
    ),
    new ChanceCard(
      'chance-211',
      'Chance',
      'Pay commission of $15',
    ),
    new ChanceCard(
      'chance-212',
      'Chance',
      'Take a trip to Labor exchange. If you pass Go, collect $200. ',
    ),
    new ChanceCard(
      'chance-213',
      'Chance',
      'Advance to HERE wallet. If you pass Go, collect $200. ',
    ),
    new ChanceCard(
      'chance-214',
      'Chance',
      'You have been elected Chairman of the Board. Pay each player $50. ',
    ),
    new ChanceCard(
      'chance-215',
      'Chance',
      'Successful trade, get $150.',
    ),
    new ChanceCard(
      'chance-216',
      'Chance',
      'You have won an airdrop - Collect $100.',
    ),
  ];
}