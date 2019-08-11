import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../interfaces/post.interface';
import { PostsService } from '../services/posts.service';
import * as moment from 'moment';

@Component({
    selector: 'app-post-edit',
    template: `
        <section></section>
        <article class="container">
            <app-text [value]="post.title"
                      [config]="{ label: 'Title', validators: { required: true, minLength: 3 } }"
                      (onChange)="handleChange('title', $event)"></app-text>
            
            <app-text [value]="post.text"
                      [config]="{ label: 'Text', type: 'textarea', validators: { required: true, minLength: 20 } }"
                      (onChange)="handleChange('text', $event)"></app-text>
            
            <div class="levels">
                <div class="level-right">
                    <app-button [label]="'Save'"
                                [theme]="isChanged && 'is-success' && (!isCreate || isCreate && post.title && post.text)"
                                (onClick)="handleSave()"></app-button>

                    <app-button *ngIf="!isCreate"
                                [label]="isConfirmDelete ? 'Confirm Delete' : 'Delete'"
                                [theme]="isConfirmDelete && 'is-danger'"
                                (onClick)="handleDelete()"></app-button>
                </div>
            </div>
            
        </article>
    `
})

export class PostEditComponent implements OnInit {
    post: Post;
    isCreate: boolean;
    isChanged: boolean;
    isConfirmDelete: boolean;

    constructor(
       private route: ActivatedRoute,
       private Router: Router,
       @Inject(PostsService) private Posts: PostsService,
    ) {
        this.route.parent.data.subscribe((data) => {
            this.post = data.post;
        });

        this.route.data.subscribe((data) => {
            this.isCreate = data.isCreate;
        });
    }

    ngOnInit() {

        if (this.isCreate) {
            this.post = {
                text: '',
                title: '',
                date: moment().format('YYYY-MM-DD HH:mm')
            };
        }
    }

    handleChange(property: string, value: string) {
        this.post[property] = value;

        this.isChanged = true;
    }

    handleDelete() {
        this.isConfirmDelete ?
            this.Posts.deletePost(this.post).then(() => this.Router.navigate(['/blog'])) :
            this.isConfirmDelete = true;
    }

    savePost() {
        this.Posts.savePost(this.post);

        this.isChanged = false;
    }

    createPost() {
        const post = this.post;

        if (!(post.text && post.title)) return;

        this.Posts
            .createPost(post)
            .then((postId: number) => {
                this.Router.navigate(['/blog', postId]);
            });

        this.isChanged = false;
    }

    handleSave() {
        this.isCreate ? this.createPost() : this.savePost();
    }

}
