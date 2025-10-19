import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCurrencyForm } from './single-currency-form';

describe('SingleCurrencyForm', () => {
  let component: SingleCurrencyForm;
  let fixture: ComponentFixture<SingleCurrencyForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCurrencyForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCurrencyForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
