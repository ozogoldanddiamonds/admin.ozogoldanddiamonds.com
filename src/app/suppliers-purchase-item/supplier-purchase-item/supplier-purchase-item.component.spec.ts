import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPurchaseItemComponent } from './supplier-purchase-item.component';

describe('SupplierPurchaseItemComponent', () => {
  let component: SupplierPurchaseItemComponent;
  let fixture: ComponentFixture<SupplierPurchaseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierPurchaseItemComponent]
    });
    fixture = TestBed.createComponent(SupplierPurchaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
