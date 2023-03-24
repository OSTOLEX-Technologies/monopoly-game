import {Card} from "./Card";
import {IRentPayable} from "./IRentPayable";

export class PropertyCard extends Card {
  color: string;
  price: number;
  rent: number;
  oneHouse: number;
  twoHouses: number;
  threeHouses: number;
  fourHouses: number;
  hotel: number;
  mortgage: number;
  houseCost: number;
  hotelCost: number;
  hotelCostNotCalc: number;
  quantity: number;
  houses: number;
  hotels: number;

  constructor(
    id: string,
    title: string,
    color: string,
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
    hotelCostNotCalc: number,
    type: string,
    quantity: number,
    houses: number,
    hotels: number) {
    super(id, title, type);

    this.color = color;
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
    this.hotelCostNotCalc = hotelCostNotCalc;
    this.quantity = quantity;
    this.houses = houses;
    this.hotels = hotels;
  }
}