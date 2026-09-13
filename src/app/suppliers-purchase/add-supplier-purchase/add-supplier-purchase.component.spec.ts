import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierPurchaseComponent } from './add-supplier-purchase.component';

describe('AddSupplierPurchaseComponent', () => {
  let component: AddSupplierPurchaseComponent;
  let fixture: ComponentFixture<AddSupplierPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSupplierPurchaseComponent]
    });
    fixture = TestBed.createComponent(AddSupplierPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
