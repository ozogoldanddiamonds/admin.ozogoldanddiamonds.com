import { TestBed } from '@angular/core/testing';

import { MakersProductionItemService } from './makers-production-item.service';

describe('MakersProductionItemService', () => {
  let service: MakersProductionItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakersProductionItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
