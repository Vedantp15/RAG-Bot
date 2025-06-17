import { TestBed } from '@angular/core/testing';

import { SentTextService } from './sent-text.service';

describe('SentTextService', () => {
  let service: SentTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
