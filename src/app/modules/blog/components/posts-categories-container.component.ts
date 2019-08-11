import { Component } from '@angular/core';

@Component({
    selector: 'app-posts-categories-container',
    template: `
        <div class="container">
            <app-posts-sorter></app-posts-sorter>
            <div class="columns">
                <app-posts-categories-recursive class="column"></app-posts-categories-recursive>
                <app-posts-categories-iter class="column"></app-posts-categories-iter>
            </div>
        </div>
    `
})

export class PostsCategoriesContainerComponent {}
