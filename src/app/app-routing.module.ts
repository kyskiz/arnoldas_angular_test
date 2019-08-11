import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';

@NgModule({
    imports: [RouterModule.forRoot([
        { path: '', pathMatch: 'full', component: HomeComponent },
        { path: 'blog', loadChildren: './modules/blog/blog.module#BlogModule' },
    ])],
    exports: [RouterModule]
})
export class AppRoutingModule { }
