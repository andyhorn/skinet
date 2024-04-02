import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ProductsSortOption, sortOptions } from './models/sort-option';
import { GetProductsParams } from './models/get-products-params';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') private readonly search?: ElementRef
  protected readonly sortOptions = sortOptions;

  protected products: Product[] = [];
  protected count: number = 0;
  protected brands: Brand[] = [];
  protected types: Type[] = [];
  protected productsParams = new GetProductsParams();

  constructor(
    private readonly service: ShopService,
  ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getProducts();
    this.getTypes();
  }

  public onBrandSelected(id: number): void {
    this.productsParams.brandId = id;
    this.productsParams.pageIndex = 1;
    this.getProducts();
  }

  public onTypeSelected(id: number): void {
    this.productsParams.typeId = id;
    this.productsParams.pageIndex = 1;
    this.getProducts();
  }

  public onSortOptionSelected(event: any): void {
    this.productsParams.sort = event.target.value;
    this.getProducts();
  }

  public onPageChanged(page: any): void {
    if (this.productsParams.pageIndex !== page) {
      this.productsParams.pageIndex = page;
      this.getProducts();
    }
  }

  public onSearch(): void {
    this.productsParams.search = this.search?.nativeElement.value;
    this.getProducts();
  }

  public onReset(): void {
    if (this.search) {
      this.search!.nativeElement.value = '';
    }

    this.productsParams = new GetProductsParams();
    this.getProducts();
  }

  private getProducts(): void {
    this.service.getProducts(this.productsParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.count = response.count;
        this.productsParams.pageIndex = response.pageIndex;
        this.productsParams.pageSize = response.pageSize;
      },
      error: (error) => console.error(error),
    });
  }

  private getBrands(): void {
    this.service.getBrands().subscribe({
      next: (response) => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: (error) => console.error(error),
    });
  }

  private getTypes(): void {
    this.service.getTypes().subscribe({
      next: (response) => this.types = [{ id: 0, name: 'All' }, ...response],
      error: (error) => console.error(error),
    });
  }
}
