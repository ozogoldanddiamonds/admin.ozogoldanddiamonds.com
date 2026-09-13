import { TestBed } from '@angular/core/testing';

import { SupplierPurchaseItemsService } from './supplier-purchase-items.service';

describe('SupplierPurchaseItemsService', () => {
  let service: SupplierPurchaseItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierPurchaseItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
