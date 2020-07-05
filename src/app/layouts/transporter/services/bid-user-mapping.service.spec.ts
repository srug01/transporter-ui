import { TestBed } from '@angular/core/testing';

import { BidUserMappingService } from './bid-user-mapping.service';

describe('BidUserMappingService', () => {
  let service: BidUserMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BidUserMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
