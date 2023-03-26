export abstract class Card {
  protected id: string;
  protected title: string;

  protected constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }
}