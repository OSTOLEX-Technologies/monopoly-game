import {CellInfoPopupData} from "./ReactManagers";
import projectspopup from "./assets/projectspopup.json";
import {cellsOwnerIcons, ownerIcons} from "./constants";
import {gameController} from "./viewGlobals";
import {PropertyCard} from "./game/Cards/PropertyCard";
import {RailroadsCard} from "./game/Cards/RailroadsCard";
import {UtilitiesCard} from "./game/Cards/UtilitiesCard";
import chanceOrTreasurySound from "./assets/sounds/SFX/chance or treasury.mp3";
import buildingHouseOrHotelSound from "./assets/sounds/SFX/building_house_or_hotel.mp3";

export function getCellInfoPopupData(cellIndex: number): CellInfoPopupData {
    const tiles = gameController.getTiles();
    const tile = tiles[cellIndex];
    let categoryImg = undefined;
    // @ts-ignore
    if (cellsOwnerIcons[cellIndex]) {
        // @ts-ignore
        categoryImg = ownerIcons[cellsOwnerIcons[cellIndex]];
    }

    let owner = undefined;
    try {
        owner = tile.getOwnerId() ? tile.getOwnerId() : undefined;
    } catch (e) {}

    let tilePrice = undefined;
    let housePrice = undefined;
    let hotelPrice = undefined;
    let mortgagePrice = undefined;
    let stage = undefined;

    const card = gameController.getCardTileByName(tile.name, tile.type, owner);

    if (card != undefined) {
        if (card instanceof PropertyCard) {
            tilePrice = card.getPrice();
            housePrice = card.getHouseCost();
            hotelPrice = card.getHotelCost();
            stage = card.getNumberOfHouses();
        } else if (card instanceof RailroadsCard) {
            tilePrice = card.getPrice();
            if (owner != undefined) {
                stage = gameController.getRailRoadsStage(owner);
            }
        } else if (card instanceof UtilitiesCard) {
            tilePrice = card.getPrice();
            if (owner != undefined) {
                stage = gameController.getUtilitiesStage(owner);
            }
        }

        mortgagePrice = card.mortgage;
    }
console.log(housePrice, hotelPrice)
    // @ts-ignore
    const data = projectspopup[tile.name]
    return {
        header: tile.name,
        price: tilePrice,
        link: data.link,
        description: data.description,
        logo: data.logo,
        owner: owner,
        categoryImg: categoryImg,
        housePrice: housePrice,
        hotelPrice: hotelPrice,
        mortgagePrice: mortgagePrice,
        stages: data.stages,
        prices: data.prices,
        currentStage: stage,
    }
}


export function playChanceOrTreasurySound(callback: () => void = () => {}) {
    const audio = new Audio(chanceOrTreasurySound);
    audio.play();
    callback();
}


export function playBuildingHouseOrHotelSound(callback: () => void = () => {}) {
    const audio = new Audio(buildingHouseOrHotelSound);
    audio.play();
    callback();
}
