import * as cuid from "cuid";

export interface Basket {
  id: string;
  items: BasketItem[];
}

export class Basket implements Basket {
  constructor() {
    this.id = cuid();
    this.items = [];
  }
}

export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}