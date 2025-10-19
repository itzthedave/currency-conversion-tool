import {TestBed} from '@angular/core/testing';

import {CurrencyService} from './currency-service';
import {provideZonelessChangeDetection} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";

describe('CurrencyService', (): void => {
    let service: CurrencyService;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(CurrencyService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });

    it('should confirm the required environment variable "currencyBeaconAuth" is available', (): void => {
        expect(environment.hasOwnProperty('currencyBeaconAuth'))
            .withContext('The environment object is missing the "currencyBeaconAuth" property.')
            .toBeTrue();
        expect(environment.currencyBeaconAuth)
            .withContext('The "currencyBeaconAuth" property is defined but its value is null or undefined.')
            .toBeDefined();
        expect(typeof environment.currencyBeaconAuth)
            .withContext('The "currencyBeaconAuth" property should be a string.')
            .toBe('string');
    });
});
