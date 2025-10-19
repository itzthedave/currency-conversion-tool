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
    error = null;
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
                private readonly cdr: ChangeDetectorRef,) {

        this.conversionSubscription = this.conversionSubject.pipe(
            debounceTime(300),
            distinctUntilChanged(),
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
                this.responseValue = r;
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
        if (fromValue.currency && fromValue.amount) {
            this.fromValue = fromValue;
        } else {
            this.fromValue = null;
        }
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
        if (toValue.currency) {
            this.toValue = toValue;
        } else {
            this.toValue = null;
        }
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
