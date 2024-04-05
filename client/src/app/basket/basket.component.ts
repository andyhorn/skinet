import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable, map } from 'rxjs';
import { BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  public readonly items$: Observable<BasketItem[]>;

  constructor(
    private readonly basketService: BasketService
  ) {
    this.items$ = this.basketService.basketSource$.pipe(
      map(basket => basket?.items ?? []),
    );
  }

  public incrementQuantity(item: BasketItem): void {
    this.basketService.addItem(item);
  }

  public removeItem(id: number, qty: number = 1): void {
    this.basketService.removeItem(id, qty);
  }
}
