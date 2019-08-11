import { TestBed, async } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                ButtonComponent,
            ]
        }).compileComponents();
    }));

    describe(':', () => {

        function setup() {
            const fixture = TestBed.createComponent(ButtonComponent);
            const button = fixture.debugElement.componentInstance;
            return { fixture, button };
        }

        it('should create the button component', async(() => {
            const { button } = setup();
            expect(button).toBeTruthy();
        }));

        it('should emit changed value', async(() => {
            const { button, fixture } = setup();

            button.label = 'Test button';

            fixture.detectChanges();

            spyOn(button.onClick, 'emit');

            const htmlElement = fixture.nativeElement;
            const buttonElement = htmlElement.querySelector('a');

            buttonElement.dispatchEvent(new Event('click'));

            expect(button.onClick.emit).toHaveBeenCalled();
        }));

        it('should set assigned class', async(() => {
            const { button, fixture } = setup();
            const themeClass = 'is-success';

            button.label = 'Test button';
            button.theme = themeClass;

            fixture.detectChanges();

            const htmlElement = fixture.nativeElement;
            const buttonElement = htmlElement.querySelector('a');

            expect(buttonElement.className).toContain(themeClass);
        }));

    });
});
