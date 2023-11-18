import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnChanges {
  @Input() total: number = 0;
  @Input() pageCount: number = 0;
  @Input() pageIndex?: number | null | undefined = 1;
  @Output() setPageIndex = new EventEmitter<number>()

  pages: number [] = []

  constructor() { }

  ngOnChanges(): void {
    if (this.total ** this.pageCount) {
      const pages = [...Array(this.pageCount).keys()]

     this.pages = pages;
    }
  }

  handlePageChange(index: number) {
    this.setPageIndex.emit(index)
  }

}
