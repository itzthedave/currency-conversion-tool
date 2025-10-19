import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatHint, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Currency, CurrencyFormValue} from "../_types/currency";

@Component({
    selector: 'app-single-currency-form',
    imports: [
        MatAutocomplete,
        MatAutocompleteTrigger,
        MatFormField,
        MatHint,
        MatInput,
        MatLabel,
        MatOption,
        MatPrefix,
        ReactiveFormsModule,
        MatSuffix,
        MatInputModule,

    ],
    templateUrl: './single-currency-form.html',
    styleUrl: './single-currency-form.css'
})
export class SingleCurrencyForm implements OnChanges {
    @Input({required: true}) currencies!: Currency[];
    @Input() setAmount: number | undefined;
    @Output() formChange: EventEmitter<CurrencyFormValue> = new EventEmitter();
    filteredCurrencies: Currency[] = [];
    currencySearchControl: FormControl = new FormControl();
    amount: FormControl = new FormControl();

    constructor() {
        this.currencySearchControl.valueChanges.subscribe(
            (value): void => {
                // check value is type of currency by checking for short_code
                this.formChange.emit({
                    currency: value?.short_code ? value.short_code : undefined,
                    amount: this.amount.value,
                });
                this.filteredCurrencies = [];
                if (value && typeof value == 'string') {
                    value = value?.toLowerCase()
                }
                this.filteredCurrencies = this.currencies?.filter(
                    (currency: Currency): boolean => currency.name.toLowerCase().includes(value)
                );
            }
        );
        this.amount.valueChanges.subscribe(
            (value): void => {
                this.formChange.emit({
                    currency: this.currencySearchControl.value?.short_code ? this.currencySearchControl.value.short_code : undefined,
                    amount: value,
                });
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['setAmount']?.currentValue) {
            this.amount.setValue(this.setAmount);
        }
        if (changes['currencies']?.currentValue) {
            // set the initial currencies
            let currencyCodeToFind: string = !!(this.setAmount || this.setAmount == 0) ? 'USD' : 'GBP'
            const i: number = this.currencies.findIndex((x: any): boolean => x.short_code === currencyCodeToFind);
            if (i != null && i >= 0) {
                this.currencySearchControl.setValue(this.currencies[i]);
            }
        }
    }

    displayFn(currency: Currency): string {
        // Storing object not name so display correctly to user
        return currency?.name || '';
    }
}
