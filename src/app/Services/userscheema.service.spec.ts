import { TestBed } from '@angular/core/testing';

import { UserscheemaService } from './userscheema.service';

describe('UserscheemaService', () => {
  let service: UserscheemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserscheemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
