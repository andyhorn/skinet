import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly baseUrl = environment.apiUrl;
  private readonly basketSource = new BehaviorSubject<Basket | null>(null);
  private readonly basketTotalSource = new BehaviorSubject<BasketTotals | null>(
    null
  );

  public readonly basket$ = this.basketSource.asObservable();
  public readonly basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private readonly http: HttpClient) {}

  public getBasket(id: string): void {
    this.http.get<Basket>(`${this.baseUrl}basket?id=${id}`).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      },
    });
  }

  public setBasket(basket: Basket): void {
    this.http.post<Basket>(`${this.baseUrl}basket`, basket).subscribe({
      next: (basket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      },
    });
  }

  public getCurrentBasketValue(): Basket | null {
    return this.basketSource.value;
  }

  public addItem(item: Product | BasketItem, qty: number = 1): void {
    if (this.isProduct(item)) {
      item = this.mapProductToItem(item);
    }

    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItems(basket.items, item, qty);
    this.setBasket(basket);
  }

  public removeItem(id: number, qty: number = 1): void {
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.removeOrUpdateItem(basket.items, id, qty);

    if (basket.items.length) {
      this.setBasket(basket);
    } else {
      this.deleteBasket(basket);
    }
  }

  private deleteBasket(basket: Basket): void {
    this.http.delete(`${this.baseUrl}basket?id=${basket.id}`).subscribe({
      next: (_) => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
    });
  }

  private addOrUpdateItems(
    items: BasketItem[],
    basketItem: BasketItem,
    qty: number
  ): BasketItem[] {
    const item = items.find((i) => i.id === basketItem.id);

    if (item) {
      item.quantity += qty;
    } else {
      basketItem.quantity = qty;
      items.push(basketItem);
    }

    return items;
  }

  private removeOrUpdateItem(
    items: BasketItem[],
    id: number,
    qty: number
  ): BasketItem[] {
    const item = items.find((i) => i.id === id);

    if (!item) {
      return items;
    }

    if (item.quantity <= qty) {
      items = items.filter((i) => i.id !== id);
    } else {
      item.quantity -= qty;
    }

    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductToItem(product: Product): BasketItem {
    return {
      brand: product.productBrand,
      id: product.id,
      name: product.name,
      pictureUrl: product.pictureUrl,
      price: product.price,
      quantity: 0,
      type: product.productType,
    };
  }

  private calculateTotals(): void {
    const basket = this.getCurrentBasketValue();

    if (!basket) {
      return;
    }

    const shipping = 0;
    const subtotal = basket.items.reduce(
      (sum, item) => (sum += item.price * item.quantity),
      0
    );
    const total = shipping + subtotal;

    this.basketTotalSource.next({
      shipping,
      subtotal,
      total,
    });
  }

  private isProduct(item: Product | BasketItem): item is Product {
    return (item as Product).productBrand !== undefined;
  }
}
