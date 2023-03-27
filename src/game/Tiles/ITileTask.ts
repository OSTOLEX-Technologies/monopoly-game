import {Action} from "../Actions/Action";

export interface ITileTask {
  doTask(): Array<Action>;
}