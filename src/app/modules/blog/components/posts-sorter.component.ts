import { Component, Inject } from '@angular/core';
import { PostSort, PostSortType, PostsService } from '../services/posts.service';

@Component({
    selector: 'app-posts-sorter',
    template: `
        <div class="columns is-mobile">
            <app-button *ngFor="let item of items"
                        [label]="item + ' ' + (sort[item] === 'asc' ? '▲' : '▼') | titlecase "
                        class="column"
                        (onClick)="handleSortClick(item)"></app-button>
        </div>
    `
})

export class PostsSorterComponent {
    sort: PostSort;
    items: string[] = [
        'year',
        'month',
        'day',
    ];

    constructor(
        @Inject(PostsService) private Posts: PostsService,
    ) {
        this.Posts.sort.subscribe((sort) => this.sort = sort);
    }

    handleSortClick(property: 'year'|'month'|'day') {
        const getOppositeType = (type) => type === PostSortType.ASC && PostSortType.DESC || PostSortType.ASC;

        this.Posts.handleSort({ [property]: getOppositeType(this.sort[property]) });

    }

}
