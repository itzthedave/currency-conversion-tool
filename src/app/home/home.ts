import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {SingleCurrencyForm} from "../single-currency-form/single-currency-form";
import {MatIconModule} from "@angular/material/icon";
import {CurrencyService} from "../_services/currency-service";
import {Currency, CurrencyFormValue} from "../_types/currency";
import {catchError, debounceTime, distinctUntilChanged, EMPTY, Subject, Subscription, switchMap} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule,
        ReactiveFormsModule,
        SingleCurrencyForm,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home implements OnDestroy {
    currencies: Currency[] = [];
    fromValue: null | CurrencyFormValue = null;
    toValue: null | CurrencyFormValue = null;
    responseValue: number = 0;
    error: any = null;
    private conversionSubject: Subject<{
        fromCurrency: string,
        toCurrency: string,
        amount: number
    }> = new Subject<{
        fromCurrency: string,
        toCurrency: string,
        amount: number
    }>();
    private readonly conversionSubscription: Subscription;

    constructor(private currencyService: CurrencyService,
                private readonly cdr: ChangeDetectorRef) {

        this.conversionSubscription = this.conversionSubject.pipe(
            // only submit when user stops typing
            debounceTime(300),
            // Do not call if values unchanged
            distinctUntilChanged(),
            // cancel previous calls
            switchMap(formResult => {
                return this.currencyService.convertCurrency(formResult.fromCurrency, formResult.toCurrency, formResult.amount).pipe(
                    catchError(e => {
                        console.error(e);
                        return EMPTY;
                    })
                );
            })
        ).subscribe({
            next: (r): void => {
                this.responseValue = Math.round(r * 100) / 100;
                // Zoneless build so alert for new changes TODO change to signals to avoid having to call detectChanges
                this.cdr.detectChanges();
            },
            error: (e): void => {
                console.error(e);
            }
        });

        this.currencyService.getCurrencies().subscribe({
            next: result => {
                if (result) {
                    this.currencies = result;
                    // Zoneless build so alert for new changes
                    this.cdr.detectChanges();
                }
            }, error: error => {
                console.error(error);
                this.error = error;
            }
        })
    }

    setFromValue(fromValue: CurrencyFormValue): void {
        this.responseValue = 0;
        // check the form is valid before setting the values
        if (fromValue.currency && fromValue.amount) {
            this.fromValue = fromValue;
        } else {
            this.fromValue = null;
        }
        // ensure all necessary values are present before calling currency conversion
        if (this.fromValue?.currency && this.toValue?.currency && this.fromValue?.amount) {
            this.conversionSubject.next({
                fromCurrency: this.fromValue?.currency,
                toCurrency: this.toValue?.currency,
                amount: this.fromValue?.amount
            });
        }
    }

    setToValue(toValue: CurrencyFormValue): void {
        this.responseValue = 0;
        // check the form is valid before setting the values
        if (toValue.currency) {
            this.toValue = toValue;
        } else {
            this.toValue = null;
        }
        // ensure all necessary values are present before calling currency conversion
        if (this.fromValue?.currency && this.toValue?.currency && this.fromValue?.amount) {
            this.conversionSubject.next({
                fromCurrency: this.fromValue?.currency,
                toCurrency: this.toValue?.currency,
                amount: this.fromValue?.amount
            });
        }
    }

    ngOnDestroy(): void {
        if (this.conversionSubscription) {
            this.conversionSubscription.unsubscribe();
        }
    }

}
