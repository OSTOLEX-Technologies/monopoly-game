import {AudioListener, Vector3} from "three";
import {createContext} from "react";

export const AudioListenerContext = createContext(new AudioListener());

export const CELLS_ON_SIDE = 9;
export const CELLS_ON_BOARD = CELLS_ON_SIDE * 4 - 4;

export const JAIL_POSITION = new Vector3(2.3, 0, -2.3);
export const JAIL_POSITION_ARRAY: [number, number, number] = [
    JAIL_POSITION.x,
    JAIL_POSITION.y,
    JAIL_POSITION.z
]
export const JAIL_EXIT_CELL_INDEX = 8;

export enum PieceColor {
    Pink = "#FF8EFA",
    Purple = "#A800FF",
    Green = "#00FD00",
    Yellow = "#FFEF00",
    Blue = "#0083F3",
    Orange = "#FF8400",
    Navyblue = "#0AFAFB",
    Red = "#F5007A",
}

export enum OwnerIconsTypes {
    Games = "games",
    Guild = "guild",
    Lending = "lending",
    Network = "network",
    NFT = "nft",
    Building = "building",
    DeFi = "DeFi",
    Wallet = "wallet",
    Aurora = "aurora",
}

export const piecesOnCellOffsets = Object.freeze({
    1: [
        new Vector3(0, 0, 0),
    ],
    2: [
        new Vector3(0, 0, 0.25),
        new Vector3(0, 0, -0.25)
    ],
    3: [
        new Vector3(-0.25, 0, 0.25),
        new Vector3(0.25, 0, 0),
        new Vector3(-0.25, 0, -0.25),
    ],
    4: [
        new Vector3(-0.25, 0, 0.25),
        new Vector3(0.25, 0, 0.25),
        new Vector3(-0.25, 0, -0.25),
        new Vector3(0.25, 0, -0.25),
    ],
    5: [
        new Vector3(-0.25, 0, 0.25),
        new Vector3(0.25, 0, 0.25),
        new Vector3(-0.25, 0, -0.25),
        new Vector3(0.25, 0, -0.25),
        new Vector3(0, 0, 0),
    ],
    6: [
        new Vector3(0.17, 0, 0.275),
        new Vector3(0.3, 0, 0),
        new Vector3(0.17, 0, -0.275),
        new Vector3(-0.17, 0, 0.275),
        new Vector3(-0.3, 0, 0),
        new Vector3(-0.17, 0, -0.275),
    ],
    7: [
        new Vector3(0.155, 0, 0.275),
        new Vector3(0.3, 0, 0),
        new Vector3(0.155, 0, -0.275),
        new Vector3(-0.155, 0, 0.275),
        new Vector3(-0.3, 0, 0),
        new Vector3(-0.155, 0, -0.275),
        new Vector3(0, 0, 0),
    ],
    8: [
        new Vector3(0.3, 0, 0.3),
        new Vector3(0.3, 0, 0),
        new Vector3(0.3, 0, -0.3),
        new Vector3(0, 0, -0.3),
        new Vector3(-0.3, 0, -0.3),
        new Vector3(-0.3, 0, 0),
        new Vector3(-0.3, 0, 0.3),
        new Vector3(0, 0, 0.3),
    ]
})

export const moneyChipPositions = Object.freeze({
    0: [],
    1: [
        new Vector3(0, 0, 0.5),
    ],
    2: [
        new Vector3(0.15, 0, 0.5),
        new Vector3(-0.15, 0, 0.5),
    ],
    3: [
        new Vector3(0.3, 0, 0.5),
        new Vector3(0, 0, 0.5),
        new Vector3(-0.3, 0, 0.5),
    ],
    4: [
        new Vector3(0.1, 0, 0.5),
        new Vector3(0.1, 0, 0.7),
        new Vector3(-0.1, 0, 0.7),
        new Vector3(-0.1, 0, 0.5),
    ],
    5: [
        new Vector3(0, 0, 0.65),
    ]
})


export enum CellPriceType {
    None = "none",
    Buy = "buy",
    Fee = "fee"
}


export const cellsOwnerIcons = Object.freeze({
    0: null,
    1: OwnerIconsTypes.NFT,
    2: null,
    3: OwnerIconsTypes.NFT,
    4: null,
    5: OwnerIconsTypes.Network,
    6: null,
    7: OwnerIconsTypes.Network,
    8: null,
    9: OwnerIconsTypes.DeFi,
    10: null,
    11: OwnerIconsTypes.DeFi,
    12: OwnerIconsTypes.Building,
    13: OwnerIconsTypes.Guild,
    14: null,
    15: OwnerIconsTypes.Aurora,
    16: null,
    17: OwnerIconsTypes.Aurora,
    18: null,
    19: OwnerIconsTypes.Lending,
    20: OwnerIconsTypes.Building,
    21: OwnerIconsTypes.Lending,
    22: null,
    23: OwnerIconsTypes.Games,
    24: null,
    25: OwnerIconsTypes.Games,
    26: null,
    27: OwnerIconsTypes.Guild,
    28: OwnerIconsTypes.Building,
    29: OwnerIconsTypes.Wallet,
    30: null,
    31: OwnerIconsTypes.Wallet,
})

export const ownerIcons = Object.freeze({
    [OwnerIconsTypes.Games]: import.meta.env.BASE_URL + 'models/owner_icons/Games.png',
    [OwnerIconsTypes.Guild]: import.meta.env.BASE_URL + 'models/owner_icons/Guild.png',
    [OwnerIconsTypes.Lending]: import.meta.env.BASE_URL + 'models/owner_icons/Lending.png',
    [OwnerIconsTypes.Network]: import.meta.env.BASE_URL + 'models/owner_icons/Network.png',
    [OwnerIconsTypes.NFT]: import.meta.env.BASE_URL + 'models/owner_icons/NFT.png',
    [OwnerIconsTypes.Building]: import.meta.env.BASE_URL + 'models/owner_icons/Building.png',
    [OwnerIconsTypes.DeFi]: import.meta.env.BASE_URL + 'models/owner_icons/DeFi.png',
    [OwnerIconsTypes.Wallet]: import.meta.env.BASE_URL + 'models/owner_icons/Wallet.png',
    [OwnerIconsTypes.Aurora]: import.meta.env.BASE_URL + 'models/owner_icons/Aurora.png',
})

export enum moneyChipsTypes {
    Silver = "silver",
    Gold = "gold",
}



export enum CardType {
    Chance = "chance",
    Treasury = "treasury",
}

export enum PropertyStatus {
    Redeem = "redeem",
    Mortgage = "mortgage"
}