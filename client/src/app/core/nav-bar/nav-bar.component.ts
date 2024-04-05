import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public itemCount: Observable<number>;

  constructor(
    private readonly basketService: BasketService
  ) {
    this.itemCount = this.basketService.basketSource$.pipe(
      map(basket => basket?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0),
    );
  }
}
