import { TestBed } from '@angular/core/testing';

import { CfsrateService } from './cfsrate.service';

describe('CfsrateService', () => {
  let service: CfsrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfsrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
