import { sortOptions } from "./sort-option";


export class GetProductsParams {
  public brandId: number = 0;
  public typeId: number = 0;
  public sort: string = sortOptions[0].value;
  public pageSize: number = 6;
  public pageIndex: number = 1;
  public search?: string;
}