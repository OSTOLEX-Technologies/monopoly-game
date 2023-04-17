import {Vector3} from "three";

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
    Person = "person",
    Swap = "swap",
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


export const cellsOwnerIcons = Object.freeze({
    0: null,
    1: OwnerIconsTypes.NFT,
    2: null,
    3: OwnerIconsTypes.NFT,
    4: null,
    5: null,
    6: OwnerIconsTypes.Swap,
    7: OwnerIconsTypes.Swap,
    8: null,
    9: OwnerIconsTypes.Games,
    10: null,
    11: OwnerIconsTypes.Games,
    12: OwnerIconsTypes.Person,
    13: OwnerIconsTypes.Lending,
    14: null,
    15: OwnerIconsTypes.Lending,
    16: null,
    17: null,
    18: OwnerIconsTypes.Wallet,
    19: OwnerIconsTypes.Network,
    20: OwnerIconsTypes.Network,
    21: OwnerIconsTypes.Person,
    22: null,
    23: OwnerIconsTypes.Aurora,
    24: null,
    25: OwnerIconsTypes.Aurora,
    26: OwnerIconsTypes.Wallet,
    27: null,
    28: OwnerIconsTypes.Person,
    29: OwnerIconsTypes.Guild,
    30: null,
    31: OwnerIconsTypes.Guild,
})

export enum CardType {
    Chance = "chance",
    Treasury = "treasury",
}

export enum PropertyStatus {
    Redeem = "redeem",
    Mortgage = "mortgage"
}