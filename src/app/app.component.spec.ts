import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header.component';

describe('AppComponent', () => {
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            declarations: [
                AppComponent,
                HeaderComponent,
            ]
        }).compileComponents();
    }));

    describe(':', () => {

        function setup() {
            const fixture = TestBed.createComponent(AppComponent);
            const app = fixture.debugElement.componentInstance;
            return { fixture, app };
        }

        it('should create the app', () => {
            const { app } = setup();
            expect(app).toBeTruthy();
        });

        it(`should have as title 'arnoldas'`, () => {
            const { app } = setup();
            expect(app.title).toEqual('arnoldas');
        });

        it('should contain 3 navbar links', () => {
            const { fixture } = setup();

            const htmlElement = fixture.nativeElement;
            const navbarItems = htmlElement.querySelectorAll('.navbar-menu .navbar-item');

            expect(navbarItems.length).toEqual(3);
        });

    });

});
