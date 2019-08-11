import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-text',
    template: `
        <div class="field">
            <label class="label">
                {{ config.label }}
                <ng-container *ngIf="config?.validators?.required">*</ng-container>
            </label>
            <div class="control">
                <ng-container [ngSwitch]="config.type">
                    
                    <textarea *ngSwitchCase="'textarea'" 
                              class="textarea"
                              [formControl]="control"
                              [placeholder]="config.placeholder || config.label"
                              [value]="value"></textarea>
                    
                    <input *ngSwitchDefault 
                           class="input" 
                           [formControl]="control"
                           [type]="config.type || 'text'" 
                           [placeholder]="config.placeholder || config.label" 
                           [value]="value"
                    >
                </ng-container>
            </div>
            
            <p class="help is-danger">
                &nbsp;
                <ng-container *ngIf="control.errors && (control.touched || control.dirty)">
                    
                    <ng-container *ngIf="control.errors.required">
                        This field is required; 
                    </ng-container>
                    
                    <ng-container *ngIf="control.errors.minlength">
                        Min length: {{ control.errors.minlength.requiredLength }}; 
                    </ng-container>
                    
                </ng-container>
            </p>
            
        </div>
    `
})

export class TextComponent implements OnInit, OnChanges {
    @Input() value: string = '';
    @Input() config: {
        label: string,
        type?: 'text'|'textarea',
        placeholder?: string,
        validators?: {
            required?: boolean,
            minLength?: number,
        },
    };
    @Input() disabled: boolean;
    @Output() onChange: EventEmitter<string> = new EventEmitter();

    control: FormControl;

    constructor() {

    }

    ngOnInit() {
        this.setControl();

        this.control.valueChanges.subscribe((value) => this.handleChange(value));
    }

    ngOnChanges(changes: SimpleChanges) {
        const disabled = changes.disabled;

        if (disabled) this.setControl();

    }

    handleChange(value: string) {
        if (this.control.valid) this.onChange.emit(value);
    }

    setControl() {
        let config = this.config;
        let validators = [];

        if (config.validators) {

            if (config.validators.required) validators.push(Validators.required);

            if (config.validators.minLength) validators.push(Validators.minLength(config.validators.minLength));

        }

        this.control = new FormControl({ value : this.value, disabled: this.disabled } || '', { updateOn: 'blur', validators });

        if (this.disabled) this.control.disable();

    }

}
