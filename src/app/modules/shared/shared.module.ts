import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsPipe } from './pipes/words.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { ReversePipe } from './pipes/reverse.pipe';

import { PaginationComponent } from './pagination.component';
import { TextComponent } from './components/text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        WordsPipe,
        KeysPipe,
        ReversePipe,

        PaginationComponent,
        TextComponent,
        ButtonComponent,
    ],
    entryComponents: [
        PaginationComponent,
        TextComponent,
        ButtonComponent,
    ],
    exports: [
        WordsPipe,
        KeysPipe,
        ReversePipe,

        PaginationComponent,
        TextComponent,
        ButtonComponent,
    ]
})

export class SharedModule {}
