import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsContainerComponent } from './components/posts-container.component';
import { PostsService } from './services/posts.service';
import { SharedModule } from '../shared/shared.module';
import { PostPreviewComponent } from './components/post-preview.component';
import { PostResolver, TrueResolver } from './blog.resolvers';
import { PostContainerComponent } from './components/post-container.component';
import { PostEditComponent } from './components/post-edit.component';
import { PostsSorterComponent } from './components/posts-sorter.component';
import { PostsCategoriesContainerComponent } from './components/posts-categories-container.component';
import { PostsCategoriesIterableComponent } from './components/posts-categories-iterable.component';
import { PostsCategoriesRecursiveComponent } from './components/posts-categories-recursive.component';
import { PostsCategoriesRecursiveItemComponent } from './components/posts-categories-recursive-item.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: PostsContainerComponent, pathMatch: 'full' },
            { path: 'categories', component: PostsCategoriesContainerComponent },
            { path: 'create', component: PostEditComponent, resolve: { isCreate: TrueResolver } },
            { path: ':postId', component: PostContainerComponent, resolve: { post: PostResolver }, children: [
                { path: '', component: PostPreviewComponent },
                { path: 'edit', component: PostEditComponent },
            ]},
        ]),
        CommonModule,
        SharedModule,
    ],
    providers: [
        PostsService,
        PostResolver,
        TrueResolver,
    ],
    declarations: [
        PostsContainerComponent,
        PostContainerComponent,
        PostPreviewComponent,
        PostEditComponent,
        PostsSorterComponent,
        PostsCategoriesContainerComponent,
        PostsCategoriesIterableComponent,
        PostsCategoriesRecursiveComponent,
        PostsCategoriesRecursiveItemComponent,
    ],
    entryComponents: [
        PostsContainerComponent,
        PostContainerComponent,
        PostPreviewComponent,
        PostEditComponent,
        PostsSorterComponent,
        PostsCategoriesContainerComponent,
        PostsCategoriesIterableComponent,
        PostsCategoriesRecursiveComponent,
        PostsCategoriesRecursiveItemComponent,
    ],
})

export class BlogModule {}
