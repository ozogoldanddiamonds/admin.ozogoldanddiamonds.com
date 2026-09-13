import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaPaymentListComponent } from './schema-payment-list.component';

describe('SchemaPaymentListComponent', () => {
  let component: SchemaPaymentListComponent;
  let fixture: ComponentFixture<SchemaPaymentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchemaPaymentListComponent]
    });
    fixture = TestBed.createComponent(SchemaPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
