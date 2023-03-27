import {Action} from "../Actions/Action";

export interface ICardTask {
  doTask(): Array<Action>;
}