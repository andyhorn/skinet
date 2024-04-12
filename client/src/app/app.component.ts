import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Skinet';

  constructor(
    private readonly basketService: BasketService,
    private readonly accountService: AccountService
  ) {}

  public ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');

    if (basketId) {
      this.basketService.getBasket(basketId);
    }

    this.accountService.loadCurrentUser().subscribe();
  }
}
