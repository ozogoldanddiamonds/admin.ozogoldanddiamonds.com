import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPurchaseListComponent } from './supplier-purchase-list.component';

describe('SupplierPurchaseListComponent', () => {
  let component: SupplierPurchaseListComponent;
  let fixture: ComponentFixture<SupplierPurchaseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierPurchaseListComponent]
    });
    fixture = TestBed.createComponent(SupplierPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
