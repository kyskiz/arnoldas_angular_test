import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Inject } from '@angular/core';
import { PostsService } from './services/posts.service';
import { findById } from '../../utils';

export class PostResolver implements Resolve<any> {

    constructor(
        @Inject(PostsService) private Posts: PostsService,
        @Inject(Router) private Router: Router,
    ) {

    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any> {
        const posts = this.Posts.getPosts();
        const post = findById(posts, +route.params.postId);

        return post || this.Router.navigate(['blog']);
    }
}

export class TrueResolver implements Resolve<any> {

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<any> {
        return Promise.resolve(true);
    }
}
