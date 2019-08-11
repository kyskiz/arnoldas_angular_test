import { Component, Input } from '@angular/core';
import { PostCategoryRecursive } from './posts-categories-recursive.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { twoDigit } from '../../../utils';

const COLORS = [
    '#FFF49C',
    '#F9FFCB',
    '#85DE77',
];

@Component({
    selector: 'app-post-categories-recursive-item-component',
    template: `        
        <div [ngStyle]="{ 'background': colors[level] }"
             class="PostCategoriesRecursiveItem"
        >
            <h5 class="subtitle is-5"
                [ngClass]="{ 'Clickable' : !data.children.length }"
                (click)="handleClick()"
            >{{ data.name }}</h5>
           
            <app-post-categories-recursive-item-component *ngFor="let child of data.children"
                                                          [data]="child"
                                                          [level]="level + 1"
                                                          [parentName]="(parentName && parentName + '-' || '') + data.name"></app-post-categories-recursive-item-component>
        </div>
    `,
    styles: [`
        .PostCategoriesRecursiveItem {
            margin-left: 1rem;
            padding: 0.5rem 0 0.5rem 0.5rem;
            text-align: center;
        }
        
        
        :host:last-child {
            margin-bottom: 0.5rem;
        }
    `]
})

export class PostsCategoriesRecursiveItemComponent {
    @Input() data: PostCategoryRecursive;
    @Input() level: number = 0;
    @Input() parentName: string;
    colors: string[] = COLORS;

    constructor(
        private Router: Router,
    ) {

    }

    handleClick() {
        if (this.data.children.length) return;

        let string = `${this.parentName}-${this.data.name}`;

        let result = string.split('-').map((part) => part.length === 1 && twoDigit(part) || part).join('-');

        this.Router.navigate(['/blog'], { queryParams: { filter: result } });
    }

}
