export abstract class Card {
  private id: string;
  private title: string;

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