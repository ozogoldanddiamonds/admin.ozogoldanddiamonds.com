import { TestBed } from '@angular/core/testing';

import { SupplierPurchaseService } from './supplier-purchase.service';

describe('SupplierPurchaseService', () => {
  let service: SupplierPurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierPurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
