import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupplierPurchaseItemComponent } from './update-supplier-purchase-item.component';

describe('UpdateSupplierPurchaseItemComponent', () => {
  let component: UpdateSupplierPurchaseItemComponent;
  let fixture: ComponentFixture<UpdateSupplierPurchaseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSupplierPurchaseItemComponent]
    });
    fixture = TestBed.createComponent(UpdateSupplierPurchaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
