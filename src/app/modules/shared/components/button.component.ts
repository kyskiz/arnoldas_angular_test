import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `
        <a [classList]="'button ' + theme"
           (click)="handleClick($event)"
        >{{ label }}</a>
    `
})

export class ButtonComponent {
    @Input() label: string;
    @Input() theme: string;
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();

    constructor() {

    }

    handleClick(event: MouseEvent) {
        this.onClick.emit(event);
    }

}
