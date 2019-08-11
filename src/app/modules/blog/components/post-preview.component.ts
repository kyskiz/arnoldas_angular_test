import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../interfaces/post.interface';

@Component({
    selector: 'app-post-preview',
    template: `
        <section></section>
        <article class="container">
            <h3 class="title is-3">{{ post.title }}</h3>
            <h6 class="subtitle is-6">{{ post.date }}</h6>
            
            <div class="content">
                {{ post.text }}
            </div>
        </article>
    `
})

export class PostPreviewComponent {
    post: Post;

    constructor(
       private route: ActivatedRoute,
    ) {
        this.route.data.subscribe((data) => {
            this.post = data.post
        });
    }
}
