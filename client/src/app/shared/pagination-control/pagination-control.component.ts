import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-control',
  templateUrl: './pagination-control.component.html',
  styleUrls: ['./pagination-control.component.scss']
})
export class PaginationControlComponent {
  @Input() pageSize?: number;
  @Input() totalItems?: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  public pageChangeHandler(event: any): void {
    this.pageChanged.emit(event.page);
  }
}
