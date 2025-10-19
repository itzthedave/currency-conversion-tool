import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleCurrencyForm} from './single-currency-form';

describe('SingleCurrencyForm', (): void => {
    let component: SingleCurrencyForm;
    let fixture: ComponentFixture<SingleCurrencyForm>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [SingleCurrencyForm]
        }).compileComponents();

        fixture = TestBed.createComponent(SingleCurrencyForm);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});
