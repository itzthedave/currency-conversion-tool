import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Home} from './home';
import {provideZonelessChangeDetection} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('Home', (): void => {
    let component: Home;
    let fixture: ComponentFixture<Home>;

    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [Home],
            providers: [provideZonelessChangeDetection(), provideHttpClient(), provideHttpClientTesting()]
        }).compileComponents();

        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });
});
