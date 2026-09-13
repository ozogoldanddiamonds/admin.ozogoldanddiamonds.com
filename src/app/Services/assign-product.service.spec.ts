import { TestBed } from '@angular/core/testing';

import { AssignProductService } from './assign-product.service';

describe('AssignProductService', () => {
  let service: AssignProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
