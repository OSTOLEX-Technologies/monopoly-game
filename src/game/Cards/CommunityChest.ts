import {Card} from "./Card";
import {ICardTask} from "./ICardTask";
import {Action} from "../Actions/Action";

export class CommunityChest extends Card implements ICardTask {
  private description: string;

  constructor(id: string, title: string, description: string) {
    super(id, title);

    this.description = description;
  }

  doTask(): Array<Action> {
    return new Array();
  }
}