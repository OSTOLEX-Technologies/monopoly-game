import {CellInfoPopupData} from "./ReactManagers";
import {getPropertyCards, getTiles} from "./game/GameConfig";
import projectspopup from "./assets/projectspopup.json";
import {cellsOwnerIcons, ownerIcons} from "./constants";

export function getCellInfoPopupData(cellIndex: number): CellInfoPopupData {
    const tiles = getTiles([]);
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

    let housePrice = undefined;
    let hotelPrice = undefined;
    let mortgagePrice = undefined;
    let housesCount = undefined;

    if (getPropertyCards().findIndex((card) => card.getTitle() === tile.name) !== -1) {
        const propertyCard = getPropertyCards().find((card) => card.getTitle() === tile.name);
        if (propertyCard) {
            housePrice = propertyCard.getHouseCost();
            hotelPrice = propertyCard.getHotelCost();
            mortgagePrice = propertyCard.mortgage;
            housesCount = propertyCard.getNumberOfHouses();
        }
    }

    // @ts-ignore
    const data = projectspopup[tile.name]
    return {
        header: tile.name,
        link: data.link,
        description: data.description,
        logo: data.logo,
        owner: owner,
        categoryImg: categoryImg,
        housePrice: housePrice,
        hotelPrice: hotelPrice,
        mortgagePrice: mortgagePrice,
        stages: data.stages,
        currentStage: housesCount,
    }
}