import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleCurrencyForm} from './single-currency-form';
import {provideZonelessChangeDetection} from "@angular/core";
import {FormControl} from "@angular/forms";

describe('SingleCurrencyForm', (): void => {
    let component: SingleCurrencyForm;
    let fixture: ComponentFixture<SingleCurrencyForm>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [SingleCurrencyForm],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();

        fixture = TestBed.createComponent(SingleCurrencyForm);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form controls', (): void => {
        expect(component.currencySearchControl)
            .withContext('currencySearchControl should be initialized')
            .toBeInstanceOf(FormControl);

        expect(component.amount)
            .withContext('amount control should be initialized')
            .toBeInstanceOf(FormControl);

        expect(component.amount.value)
            .withContext('amount control should default to 0 or null')
            .toBe(null);
    });
});
