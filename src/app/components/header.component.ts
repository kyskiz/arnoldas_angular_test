import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="container">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" [routerLink]="['']">
                    <img src="http://static.tumblr.com/htkabx2/Lzflbbscr/blog.png" width="112" height="28">
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" (click)="isMenuActive = !isMenuActive">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" [ngClass]="{ 'is-active': isMenuActive }">
                <div class="navbar-start">
                    <a class="navbar-item" [routerLink]="['']">
                        Home
                    </a>

                    <a class="navbar-item" [routerLink]="['blog']">
                        Blog
                    </a>

                    <a class="navbar-item" [routerLink]="['blog', 'categories']">
                        Categories
                    </a>

                </div>

            </div>
        </nav>
    </div>
  `
})

export class HeaderComponent {
  isMenuActive: boolean;

  constructor() {

  }

}
