import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PostSort, PostsService } from '../services/posts.service';
import { Post } from '../../../interfaces/post.interface';
import { Subscription } from 'rxjs';
import { getDateData, twoDigit } from '../../../utils';
import { Router } from '@angular/router';

@Component({
    selector: 'app-posts-categories-iter',
    template: `        
        <table class="table is-fullwidth">
            <thead>
            <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Day</th>
            </tr>
            </thead>
            <tbody>
            <ng-container *ngFor="let year of data | keys | reverse: sort.year === 'desc'">
                <ng-container *ngFor="let month of year.value | keys | reverse: sort.month === 'desc'">
                    <tr *ngFor="let day of month.value | reverse"
                        class="Clickable"
                        (click)="handleClick(year.key, month.key, day)"
                    >
                        <td>{{ year.key }}</td>
                        <td>{{ month.key }}</td>
                        <td>{{ day }}</td>
                    </tr>
                </ng-container>
            </ng-container>
            
            </tbody>
        </table>
    `
})

export class PostsCategoriesIterableComponent implements OnInit, OnDestroy {
    posts: Post[];
    _subs: Subscription[] = [];
    data: any;
    sort: PostSort;

    constructor(
        @Inject(PostsService) private Posts: PostsService,
        private Router: Router
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
        let data = {};

        this.posts.forEach((post) => {
            let { year, month, day } = getDateData(post);

            ++month;

            if (!data[year]) data[year] = {};
            if (!data[year][month]) data[year][month] = [];
            
            if (data[year][month].indexOf(day) === -1) data[year][month].push(day);

        });

        this.data = data;

    }

    handleClick(year: string, month: string, day: string) {
        let string = [year, month, day].join('-');
        let result = string.split('-').map((part) => part.length === 1 && twoDigit(part) || part).join('-');

        this.Router.navigate(['/blog'], { queryParams: { filter: result } });
    }

}
