import { TestBed } from '@angular/core/testing';

import { ProquitService } from './proquit.service';

describe('ProquitService', () => {
  let service: ProquitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProquitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
