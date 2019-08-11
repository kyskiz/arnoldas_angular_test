import { Component } from '@angular/core';
import { Post } from '../../../interfaces/post.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post-container',
    template: `
        <div class="container">
            
            <div class="tabs is-boxed">
                <ul>
                    <li [routerLink]="['/blog']">
                        <a> <span>Back</span> </a>
                    </li>
                </ul>
                
                <ul class="is-right">
                    <li [routerLink]="['/blog', post.id]"
                        [routerLinkActive]="'is-active'"
                        [routerLinkActiveOptions]="{exact: true}">
                        <a> <span>Preview</span> </a>
                    </li>
                    <li [routerLink]="['/blog', post.id, 'edit']"
                        [routerLinkActive]="'is-active'">
                        <a> <span>Edit</span> </a>
                    </li>
                </ul>
            </div>

            <router-outlet></router-outlet>
        </div>
    `
})

export class PostContainerComponent {
    post: Post;

    constructor(
        private route: ActivatedRoute,
    ) {
        this.route.data.subscribe((data) => {
            this.post = data.post
        });
    }
}
