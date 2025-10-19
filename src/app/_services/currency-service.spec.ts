import {TestBed} from '@angular/core/testing';

import {CurrencyService} from './currency-service';

describe('CurrencyService', (): void => {
    let service: CurrencyService;

    beforeEach((): void => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CurrencyService);
    });

    it('should be created', (): void => {
        expect(service).toBeTruthy();
    });
});
