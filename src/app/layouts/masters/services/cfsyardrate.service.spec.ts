import { TestBed } from '@angular/core/testing';

import { CfsYardRateService } from './cfsyardrate.service';

describe('CfsYardRateService', () => {
  let service: CfsYardRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfsYardRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
