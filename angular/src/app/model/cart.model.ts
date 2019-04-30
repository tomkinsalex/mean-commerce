export interface ICart {
  items: ICartItem[];
  total: number;
  itemCount: number;
}

export interface ICartItem {
  id: string;
  title: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
}