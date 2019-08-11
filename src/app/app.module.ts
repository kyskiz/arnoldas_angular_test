import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { LocalStorageService } from './services/local-storage.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header.component';
import { HomeComponent } from './components/home.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        LocalStorageService,
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
    ],
    entryComponents: [
        HeaderComponent,
        HomeComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
