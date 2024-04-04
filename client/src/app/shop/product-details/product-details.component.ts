import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  protected product?: Product;

  constructor(
    private readonly service: ShopService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService,
  ) {
    this.breadcrumbService.set('@productDetails', ' ');
  }

  public ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    if (productId) {
      this.service.getProduct(+productId).subscribe({
        next: (response) => {
          this.product = response;
          this.breadcrumbService.set('@productDetails', this.product.name);
        },
        error: (error) => console.error(error),
      });
    }
  }
}