import { TestBed } from '@angular/core/testing';

import { SizeChatService } from './size-chat.service';

describe('SizeChatService', () => {
  let service: SizeChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SizeChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
