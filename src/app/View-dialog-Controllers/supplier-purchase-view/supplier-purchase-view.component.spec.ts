import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPurchaseViewComponent } from './supplier-purchase-view.component';

describe('SupplierPurchaseViewComponent', () => {
  let component: SupplierPurchaseViewComponent;
  let fixture: ComponentFixture<SupplierPurchaseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierPurchaseViewComponent]
    });
    fixture = TestBed.createComponent(SupplierPurchaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
