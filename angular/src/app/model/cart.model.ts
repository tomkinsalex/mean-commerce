import { MCartItem } from "./cart-item.model";

export class MCart {
  public items: MCartItem[] = new Array<MCartItem>();
  public grossTotal: number = 0;
  public itemsTotal: number = 0;

  public updateFrom(src: MCart) {
    this.items = src.items;
    this.grossTotal = src.grossTotal;
    this.itemsTotal = src.itemsTotal;
  }
}