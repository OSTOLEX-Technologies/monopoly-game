import {Card, CardType} from "./Card";
import {ICardRent} from "./ICardRent";

export class PropertyCard extends Card implements ICardRent {
  private readonly price: number;
  private readonly rent: number;
  private readonly oneHouse: number;
  private readonly twoHouses: number;
  private readonly threeHouses: number;
  private readonly fourHouses: number;
  private readonly hotel: number;
  private _mortgage: number;
  private readonly houseCost: number;
  private readonly hotelCost: number;
  private quantity: number;
  private houses: number;
  private hotels: number;

  constructor(
    id: string,
    title: string,
    price: number,
    rent: number,
    oneHouse: number,
    twoHouses: number,
    threeHouses: number,
    fourHouses: number,
    hotel: number,
    mortgage: number,
    houseCost: number,
    hotelCost: number,
    quantity: number,
    houses: number,
    hotels: number) {
    super(id, title, CardType.Property);

    this.price = price;
    this.rent = rent;
    this.oneHouse = oneHouse;
    this.twoHouses = twoHouses;
    this.threeHouses = threeHouses;
    this.fourHouses = fourHouses;
    this.hotel = hotel;
    this._mortgage = mortgage;
    this.houseCost = houseCost;
    this.hotelCost = houseCost;
    this.quantity = quantity;
    this.houses = houses;
    this.hotels = hotels;
  }

  public getHotelCost() {
    return this.hotelCost;
  }

  public getHouseCost() {
    return this.houseCost;
  }

  public hasHotel() {
    return this.houses == 5;
  }

  public hasFourHouses() {
    return this.houses == 4;
  }

  public getNumberOfHouses() {
    return this.houses;
  }

  public increaseHouses() {
    this.houses++;
  }

  public getPrice() {
    return this.price;
  }

  public getRent() {
    if (this.houses == 0) {
      return this.rent;
    } else if (this.houses === 1) {
      return this.oneHouse;
    } else if (this.houses === 2) {
      return this.twoHouses;
    } else if (this.houses === 3) {
      return this.threeHouses;
    } else if (this.houses === 4) {
      return this.fourHouses;
    } else {
      return this.hotel;
    }
  }
}