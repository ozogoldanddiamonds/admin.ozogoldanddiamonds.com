import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupplierPurchaseComponent } from './update-supplier-purchase.component';

describe('UpdateSupplierPurchaseComponent', () => {
  let component: UpdateSupplierPurchaseComponent;
  let fixture: ComponentFixture<UpdateSupplierPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSupplierPurchaseComponent]
    });
    fixture = TestBed.createComponent(UpdateSupplierPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
