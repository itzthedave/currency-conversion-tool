import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Home} from './home';

describe('Home', (): void => {
    let component: Home;
    let fixture: ComponentFixture<Home>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [Home]
        }).compileComponents();

        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});
