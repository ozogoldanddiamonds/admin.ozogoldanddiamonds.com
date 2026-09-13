import { TestBed } from '@angular/core/testing';

import { SchemePaymentService } from './scheme-payment.service';

describe('SchemePaymentService', () => {
  let service: SchemePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
