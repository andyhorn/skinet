import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PaginationControlComponent } from './pagination-control/pagination-control.component';

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PaginationControlComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PaginationControlComponent
  ],
})
export class SharedModule { }
