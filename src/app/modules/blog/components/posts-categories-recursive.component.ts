import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PostSort, PostsService } from '../services/posts.service';
import { Post } from '../../../interfaces/post.interface';
import { Subscription } from 'rxjs';
import { findByProperty, getDateData } from '../../../utils';

export interface PostCategoryRecursive {
    name: number,
    children: PostCategoryRecursive[]
}

@Component({
    selector: 'app-posts-categories-recursive',
    template: `        
       
        <app-post-categories-recursive-item-component *ngFor="let child of data"
                                                      [data]="child"></app-post-categories-recursive-item-component>
      
        
    `,
    styles: [`
        :host {
            max-width: 150px;
        }
    `]
})

export class PostsCategoriesRecursiveComponent implements OnInit, OnDestroy {
    posts: Post[];
    _subs: Subscription[] = [];
    data: PostCategoryRecursive[];
    sort: PostSort;

    constructor(
        @Inject(PostsService) private Posts: PostsService,
    ) {
        this._subs.push(this.Posts.sortTimestamp.subscribe(() => this.getPosts()));
        this._subs.push(this.Posts.sort.subscribe((value) => this.sort = value));
    }

    ngOnInit(): void {
        this.getPosts();
    }

    ngOnDestroy(): void {
        this._subs.forEach((sub) => sub.unsubscribe());
    }

    getPosts() {
        this.posts = this.Posts.getPosts();
        this.categorize();
    }

    categorize() {
        let data = [];

        this.posts.forEach((post) => {
            let { year, month, day } = getDateData(post);
            ++month;

            let yearItem = findByProperty(data, 'name', year);

            if (!yearItem) {
                yearItem = { name: year, children: [] };
                data.push(yearItem);

            }

            let monthItem = findByProperty(yearItem.children, 'name', month);

            if (!monthItem) {
                monthItem = { name: month, children: [] };
                yearItem.children.push(monthItem);

            }

            let dayItem = findByProperty(monthItem.children, 'name', day);

            if (!dayItem) {
                dayItem = { name: day, children: [] };
                monthItem.children.push(dayItem);

            }

            this.data = data;

        });

        this.data = data;

    }

}
