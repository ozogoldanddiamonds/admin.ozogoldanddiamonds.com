import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentSchemeComponent } from './view-payment-scheme.component';

describe('ViewPaymentSchemeComponent', () => {
  let component: ViewPaymentSchemeComponent;
  let fixture: ComponentFixture<ViewPaymentSchemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPaymentSchemeComponent]
    });
    fixture = TestBed.createComponent(ViewPaymentSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
