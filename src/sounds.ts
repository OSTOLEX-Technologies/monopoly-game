import bankruptSound from "./assets/sounds/SFX/bankrupt.mp3";
import buildingHouseOrHotelSound from "./assets/sounds/SFX/building_house_or_hotel.mp3";
import releaseFromJailSound from "./assets/sounds/SFX/release from prison.mp3";
import purchaseOfAPlotSound from "./assets/sounds/SFX/purchase of a plot.mp3";
import chanceOrTreasurySound from "./assets/sounds/SFX/chance or treasury.mp3";
import incomeSound from "./assets/sounds/SFX/income.mp3";
import goToJailSound from "./assets/sounds/SFX/go to jail.mp3";
import rentTaxFinesSound from "./assets/sounds/SFX/rent, tax, fines.mp3";
import stepOnTheSectorSound from "./assets/sounds/SFX/step on the sector.mp3";
import grateClosedSound from "./assets/sounds/SFX/the grate closed.mp3";

export function preloadSound(src: string) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.load();
}

preloadSound(bankruptSound);
preloadSound(buildingHouseOrHotelSound);
preloadSound(releaseFromJailSound);
preloadSound(purchaseOfAPlotSound);
preloadSound(chanceOrTreasurySound);
preloadSound(incomeSound);
preloadSound(goToJailSound);
preloadSound(rentTaxFinesSound);
preloadSound(stepOnTheSectorSound);
preloadSound(grateClosedSound);

export function playChanceOrTreasurySound(callback: () => void = () => {
}) {
    const audio = new Audio(chanceOrTreasurySound);
    audio.play();
    callback();
}

export function playBuildingHouseOrHotelSound(callback: () => void = () => {
}) {
    const audio = new Audio(buildingHouseOrHotelSound);
    audio.play();
    callback();
}

export function playBankruptSound(callback: () => void = () => {
}) {
    const audio = new Audio(bankruptSound);
    audio.play();
    callback();
}

export function playGoToJailSound(callback: () => void = () => {
}) {
    const audio = new Audio(goToJailSound);
    audio.play();
    callback();
}

export function playGrateClosedSound(callback: () => void = () => {}) {
    const audio = new Audio(grateClosedSound);
    audio.play();
    callback();
}

export function playIncomeSound(callback: () => void = () => {
}) {
    const audio = new Audio(incomeSound);
    audio.play();
    callback();
}

export function playPurchaseOfAPlotSound(callback: () => void = () => {
}) {
    const audio = new Audio(purchaseOfAPlotSound);
    audio.play();
    callback();
}

export function playRentTaxFinesSound(callback: () => void = () => {
}) {
    const audio = new Audio(rentTaxFinesSound);
    audio.play();
    callback();
}

export function playReleaseFromJailSound(callback: () => void = () => {
}) {
    const audio = new Audio(releaseFromJailSound);
    audio.play();
    callback();
}

export function playStepOnTheSectorSound(callback: () => void = () => {
}) {
    const audio = new Audio(stepOnTheSectorSound);
    audio.play();
    callback();
}