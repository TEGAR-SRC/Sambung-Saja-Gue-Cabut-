import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Paginate } from '../../../interface/paginate.interface';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() public total: number;
  @Input() public currentPage: number;
  @Input() public pageSize: number;

  @Output() setPage: EventEmitter<number> = new EventEmitter();

  public paginate: Paginate; // Pagination use only
  public startIndex: number;
  public endIndex: number;

  constructor() { }

  // Detect changes
  ngOnChanges(changes: SimpleChanges) {
    this.total = changes['total'] ? changes['total'].currentValue : this.total;
    this.currentPage = changes['currentPage'] ? changes['currentPage'].currentValue : this.currentPage;
    this.pageSize = changes['pageSize'] ? changes['pageSize'].currentValue : this.pageSize;
    this.paginate = this.getPager(this.total, this.currentPage, this.pageSize);
  }

  // Set Page
  pageSet(page: number) {
    this.setPage.emit(page);  // Set Page Number  
  }

  // // Get Pager For Pagination
  getPager(totalItems: number, currentPage: number, pageSize: number) {
  // calculate total pages
  let totalPages = Number(Math.ceil(Number(totalItems) / Number(pageSize)));

  // Paginate Range
  let paginateRange = 3;

  // ensure current page isn't out of range
  if (Number(currentPage) < 1) {
    currentPage = 1;
  } else if (Number(currentPage) > Number(totalPages)) {
    currentPage = Number(totalPages);
  }

  let startPage: number, endPage: number;
  if (Number(totalPages) <= Number(paginateRange)) {
    // Less than or equal to the paginateRange
    startPage = 1;
    endPage = Number(totalPages);
  } else if (Number(currentPage) <= Number(Math.floor(Number(paginateRange) / 2))) {
    // Near the beginning
    startPage = 1;
    endPage = Number(paginateRange);
  } else if (Number(currentPage) >= Number(totalPages) - Number(Math.floor(Number(paginateRange) / 2))) {
    // Near the end
    startPage = Number(totalPages) - Number(paginateRange) + 1;
    endPage = Number(totalPages);
  } else {
    // In the middle
    startPage = Number(currentPage) - Number(Math.floor(Number(paginateRange) / 2));
    endPage = Number(currentPage) + Number(Math.floor(Number(paginateRange) / 2));
  }

  // calculate start and end item indexes
  let startIndex = (Number(currentPage) - 1) * Number(pageSize);
  let endIndex = Math.min(Number(startIndex) + Number(pageSize) - 1, Number(totalItems) - 1);


  // let startIndex = (currentPage - 1) * pageSize;
  // let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array((Number(endPage) + 1) - Number(startPage)).keys()).map(i => Number(startPage) + Number(i));

  // return object with all pager properties required by the view


  this.startIndex = startIndex;
  this.endIndex = endIndex;

  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };


  }
  
}
