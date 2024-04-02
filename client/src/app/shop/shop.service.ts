import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Observable } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { GetProductsParams } from './models/get-products-params';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private readonly baseUrl = 'https://localhost:5001/api/';

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}products/${id}`);
  }

  public getProducts(options: GetProductsParams): Observable<Pagination<Product>> {
    let params = new HttpParams().append('pageSize', options.pageSize);

    if (options.brandId) {
      params = params.append('brandId', options.brandId.toString());
    }

    if (options.typeId) {
      params = params.append('typeId', options.typeId.toString());
    }

    if (options.sort) {
      params = params.append('sort', options.sort);
    }

    if (options.pageIndex) {
      params = params.append('pageIndex', options.pageIndex);
    }

    if (options.search) {
      params = params.append('search', options.search);
    }

    return this.http.get<Pagination<Product>>(`${this.baseUrl}products`, {
      params,
    });
  }

  public getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseUrl}products/brands`);
  }

  public getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.baseUrl}products/types`);
  }
}
