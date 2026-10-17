import { TestBed } from '@angular/core/testing';

import { MetaKeyWordsService } from './meta-key-words.service';

describe('MetaKeyWordsService', () => {
  let service: MetaKeyWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaKeyWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
