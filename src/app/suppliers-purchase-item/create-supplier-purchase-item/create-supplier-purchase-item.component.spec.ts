import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupplierPurchaseItemComponent } from './create-supplier-purchase-item.component';

describe('CreateSupplierPurchaseItemComponent', () => {
  let component: CreateSupplierPurchaseItemComponent;
  let fixture: ComponentFixture<CreateSupplierPurchaseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSupplierPurchaseItemComponent]
    });
    fixture = TestBed.createComponent(CreateSupplierPurchaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
