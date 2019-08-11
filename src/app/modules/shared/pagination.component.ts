import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    template: `        
        <nav class="pagination is-centered" role="navigation" aria-label="pagination" *ngIf="visiblePages.length">
            <a class="pagination-previous" (click)="setPage(currPage - 1)">Previous</a>
            <a class="pagination-next" (click)="setPage(currPage + 1)">Next page</a>
            
            <ul class="pagination-list">
                
                <ng-container *ngIf="currPage > 2 && pages.length > 5">
                    <li><a class="pagination-link" (click)="setPage(0)">1</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                </ng-container>
                
                <li *ngFor="let page of visiblePages"><a class="pagination-link" [ngClass]="{ 'is-current': currPage == page }" (click)="setPage(page)">{{ page + 1 }}</a></li>

                <ng-container *ngIf="currPage < pages.length - 3 && pages.length > 5">
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a class="pagination-link" 
                           (click)="setPage(pages.length - 1)">{{ pages.length }}</a></li>
                </ng-container>
                
            </ul>
        </nav>
    `
})

export class PaginationComponent implements OnChanges {
    @Input() currPage: number = 0;
    @Input() limit: number = 0;
    @Input() total: number = 0;
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    pages: number[] = [];
    visiblePages: number[] = [];
    pageCount: number = 5;

    constructor() {

    }

    ngOnChanges(changes: any) {
        this.limitPagination();
    }

    setPages() {
        let pages = [];
        let pagesLength = 0;
        let iter;

        for (iter = 0; iter < this.total; iter += this.limit) {
            pages.push(pagesLength++);
        }

        this.pages = pages;
    }

    setPage(value: any) {

        if (value !== this.currPage && value >= 0 && value <= this.pages.length - 1) {
            this.onSelect.emit(value);

            this.currPage = value;

            this.limitPagination();
        }
    }

    limitPagination() {
        let total = this.total;
        let limit = this.limit;
        let page = this.currPage;
        let pageCountHalf = Math.floor(this.pageCount / 2);
        let limitedPages = [];
        let totalPageCount;
        let start;
        let end;
        let iter;

        if (total && limit) {
            totalPageCount = Math.ceil(total / limit);

            if (totalPageCount <= this.pageCount) {
                start = 0;
                end = totalPageCount;
            } else if (page <= pageCountHalf) {
                start = 0;
                end = this.pageCount;
            } else if (page >= (totalPageCount - pageCountHalf)) {
                start = totalPageCount - this.pageCount;
                end = totalPageCount;
            } else {
                start = page - pageCountHalf;
                end = page + pageCountHalf + 1;
            }

            if (end - start > 1) {

                for (iter = start; iter < end; iter++) {
                    limitedPages.push(iter);
                }
            }

            this.visiblePages = limitedPages;

            this.setPages();
        }
    }
}
