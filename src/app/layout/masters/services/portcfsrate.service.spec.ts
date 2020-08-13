import { TestBed } from '@angular/core/testing';

import { PortcfsrateService } from './portcfsrate.service';

describe('PortcfsrateService', () => {
  let service: PortcfsrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortcfsrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
