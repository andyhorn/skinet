import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  protected product?: Product;

  public quantity = 1;
  public quantityInBasket = 0;

  constructor(
    private readonly shopService: ShopService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
    private readonly basketService: BasketService
  ) {
    this.breadcrumbService.set('@productDetails', ' ');
  }

  public get buttonText(): string {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

  public ngOnInit(): void {
    this.loadProduct();
  }

  public increment(): void {
    this.quantity++;
  }

  public decrement(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  public updateBasket(): void {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;

        this.quantityInBasket += itemsToAdd;
        this.basketService.addItem(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;

        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItem(this.product.id, itemsToRemove);
      }
    }
  }

  private loadProduct(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if (productId) {
      this.shopService.getProduct(+productId).subscribe({
        next: (response) => {
          this.product = response;
          this.breadcrumbService.set('@productDetails', this.product.name);
          this.basketService.basket$.pipe(take(1)).subscribe({
            next: (basket) => {
              const item = basket?.items.find((i) => i.id == +productId);

              if (item) {
                this.quantity = this.quantityInBasket = item.quantity;
              }
            },
          });
        },
        error: (error) => console.error(error),
      });
    }
  }
}
