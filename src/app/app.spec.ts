import {provideZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {App} from './app';

describe('App', (): void => {
    beforeEach(async (): Promise<void> => {
        await TestBed.configureTestingModule({
            imports: [App],
            providers: [provideZonelessChangeDetection()]
        }).compileComponents();
    });

    it('should create the app', (): void => {
        const fixture: ComponentFixture<App> = TestBed.createComponent(App);
        const app: App = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

});
