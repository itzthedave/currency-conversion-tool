import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ConvertResponse, CurrenciesResponse, Currency} from "../_types/currency";

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    constructor(private http: HttpClient) {
    }

    authToken: string = environment.currencyBeaconAuth;

    getCurrencies(): Observable<Currency[] | undefined> {
        // Assuming exclusion of crypto currencies to adding fiat param https://currencybeacon.com/api-documentation
        let parameters: HttpParams = new HttpParams().set('type', 'fiat');
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authToken}),
            params: parameters
        };
        return this.http.get<Partial<CurrenciesResponse>>(`https://api.currencybeacon.com/v1/currencies`, httpOptions).pipe(map(res => res.response));
    }

    convertCurrency(from: string, to: string, amount: number): Observable<number> {
        let parameters: HttpParams = new HttpParams().set('from', from).set('to', to).set('amount', amount);
        const httpOptions = {
            headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authToken}),
            params: parameters
        };
        return this.http.get<ConvertResponse>(`https://api.currencybeacon.com/v1/convert`, httpOptions).pipe(map(res => res.value));
    }

}
