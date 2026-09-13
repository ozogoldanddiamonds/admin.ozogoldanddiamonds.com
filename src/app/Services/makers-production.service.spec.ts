import { TestBed } from '@angular/core/testing';

import { MakersProductionService } from './makers-production.service';

describe('MakersProductionService', () => {
  let service: MakersProductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakersProductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
