import {Card} from "./Card";

export class PropertyCard extends Card {
  private price: number;
  private rent: number;
  private oneHouse: number;
  private twoHouses: number;
  private threeHouses: number;
  private fourHouses: number;
  private hotel: number;
  private mortgage: number;
  private houseCost: number;
  private hotelCost: number;
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
    super(id, title);

    this.price = price;
    this.rent = rent;
    this.oneHouse = oneHouse;
    this.twoHouses = twoHouses;
    this.threeHouses = threeHouses;
    this.fourHouses = fourHouses;
    this.hotel = hotel;
    this.mortgage = mortgage;
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