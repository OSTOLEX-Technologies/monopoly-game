export class Card {
  id: string;
  title: string;
  type: string;

  constructor(id: string, title: string, type: string) {
    this.id = id;
    this.title = title;
    this.type = type;
  }
}