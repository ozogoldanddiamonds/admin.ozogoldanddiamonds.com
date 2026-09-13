import { TestBed } from '@angular/core/testing';

import { StonesRateService } from './stones-rate.service';

describe('StonesRateService', () => {
  let service: StonesRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StonesRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
