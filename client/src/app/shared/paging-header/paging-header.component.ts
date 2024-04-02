import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent {
  @Input() pageNumber?: number;
  @Input() pageSize?: number;
  @Input() totalCount?: number;

  protected get startingNumber(): number {
    return ((this.pageNumber! - 1) * this.pageSize!) + 1;
  }

  protected get endingNumber(): number {
    return Math.min(this.startingNumber + this.pageSize!, this.totalCount!);
  }
}
