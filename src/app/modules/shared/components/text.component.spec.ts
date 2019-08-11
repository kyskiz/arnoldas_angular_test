import { TestBed, async } from '@angular/core/testing';
import { TextComponent } from './text.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('TextComponent', () => {
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
            ],
            declarations: [
                TextComponent,
            ]
        }).compileComponents();
    }));

    describe(':', () => {

        function setup() {
            const fixture = TestBed.createComponent(TextComponent);
            const text = fixture.debugElement.componentInstance;
            return { fixture, text };
        }

        it('should create the text component', async(() => {
            const { text } = setup();
            expect(text).toBeTruthy();
        }));

        it('should set component label', async(async () => {
            const { text, fixture } = setup();
            const config = { label: 'Component label', validators: { required: true } };

            text.config = config;

            fixture.detectChanges();

            const htmlElement = fixture.nativeElement;
            const labelElement = htmlElement.querySelector('label');

            expect(labelElement.innerHTML).toMatch(config.label);
        }));

        it('should display input value in <input> field', async(() => {
            const { text, fixture } = setup();
            const config = { label: 'Component label' };
            const value = 'Input value';

            text.config = config;
            text.value = value;

            fixture.detectChanges();

            const htmlElement = fixture.nativeElement;
            const inputElement = htmlElement.querySelector('input');

            expect(inputElement.value).toMatch(value);
        }));

        it('should label required field with asterisk', async(() => {
            const { text, fixture } = setup();
            const config = { label: 'Component label', validators: { required: true } };

            text.config = config;

            fixture.detectChanges();

            const htmlElement = fixture.nativeElement;
            const labelElement = htmlElement.querySelector('label');

            expect(labelElement.innerHTML).toContain('*');
        }));

        it('should display required validator error', async(() => {
            const { text, fixture } = setup();
            const config = { label: 'Component label', validators: { required: true } };

            text.config = config;
            text.value = '';

            fixture.detectChanges();

            const htmlElement = fixture.nativeElement;
            const component = fixture.componentInstance;

            component.control.setValue('');
            component.control.markAsDirty();

            const errorsContainer = htmlElement.querySelector('p.help.is-danger');

            fixture.detectChanges();

            expect(errorsContainer.innerText).toContain(`This field is required;`);

        }));

        it('should display minLength validator error', async(() => {
            const { text, fixture } = setup();
            const config = { label: 'Component label', validators: { minLength: 5 } };

            text.config = config;
            text.value = '';

            fixture.detectChanges();

            const htmlElement = fixture.nativeElement;

            text.control.setValue('abc');
            text.control.markAsDirty();

            const errorsContainer = htmlElement.querySelector('p.help.is-danger');

            fixture.detectChanges();

            expect(errorsContainer.innerText).toContain(`Min length: ${config.validators.minLength}`);

        }));

        it('should emit changed value', async(() => {
            const { text, fixture } = setup();
            const config = { label: 'Component label' };
            const newValue = 'New val';

            text.config = config;
            text.value = '';

            fixture.detectChanges();

            spyOn(text.onChange, 'emit');
            text.control.setValue(newValue);

            fixture.detectChanges();
            expect(text.onChange.emit).toHaveBeenCalled();
            expect(text.onChange.emit).toHaveBeenCalledWith(newValue);

        }));

    });
});
