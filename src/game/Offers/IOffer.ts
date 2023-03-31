import {Bank} from "../Bank";

export interface IOffer {
  acceptOffer(bank: Bank): void;
}