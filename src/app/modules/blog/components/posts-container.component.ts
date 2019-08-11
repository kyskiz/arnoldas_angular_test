import { Component, Inject, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../../../interfaces/post.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-blog-container',
    template: `
        <div class="container">
            
            <div class="columns">
                <app-button class="column"
                            label="New post"
                            [routerLink]="['create']"></app-button>

                <app-posts-sorter class="column"></app-posts-sorter>
            </div>
            
            <div class="TableContainer">
                <table class="table is-fullwidth">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Preview</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let post of posts"
                        [routerLink]="['/blog', post.id]"
                        class="Clickable"
                    >
                        <td>{{ post.title }}</td>
                        <td>{{ post.date }}</td>
                        <td>{{ post.text | words: 5 }}</td>
                    </tr>
                    </tbody>
                </table>

                <app-pagination *ngIf="!filter"
                                [limit]="pagination.pageLimit" 
                                [currPage]="pagination.currPage"
                                [total]="pagination.total"
                                (onSelect)="handlePage($event)"></app-pagination>
                
            </div>
            
        </div>
    `
})

export class PostsContainerComponent implements OnInit {
    posts: Post[];
    pagination: {
        pageLimit: number,
        currPage: number,
        total: number
    } = {
        pageLimit: 12,
        currPage: 0,
        total: 0
    };
    filter: string;

    constructor(
        @Inject(PostsService) private Posts: PostsService,
        private Router: Router,
        private route: ActivatedRoute,
    ) {
        this.Posts.sortTimestamp.subscribe(() => this.handlePage());
        this.route.queryParams.subscribe((params) => {
            this.filter = params.filter;
            this.handlePage();
        });
    }
    
    ngOnInit(): void {
        this.pagination.total = this.Posts.getPosts().length;
        this.handlePage();
    }

    handlePage(page: number = this.pagination.currPage) {
        const limit = this.pagination.pageLimit;

        this.pagination.currPage = page;

        this.posts = this.Posts.getPaginated(limit, page * limit, this.filter);

    }

}
