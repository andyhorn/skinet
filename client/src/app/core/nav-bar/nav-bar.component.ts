import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public readonly user$ = this.accountService.currentUser$;
  public readonly itemCount$ = this.basketService.basket$.pipe(
    map((basket) => {
      if (basket) {
        return basket.items.reduce((sum, item) => sum + item.quantity, 0);
      }

      return 0;
    })
  );

  constructor(
    private readonly accountService: AccountService,
    private readonly basketService: BasketService
  ) {}

  public logout(): void {
    this.accountService.logout();
  }
}
