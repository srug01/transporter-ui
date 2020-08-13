import { TestBed } from '@angular/core/testing';

import { PortCfsRateService } from './portcfsrate.service';

describe('PortCfsRateService', () => {
  let service: PortCfsRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortCfsRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
