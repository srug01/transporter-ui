import { TestBed } from '@angular/core/testing';

import { YardcfsrateService } from './yardcfsrate.service';

describe('YardcfsrateService', () => {
  let service: YardcfsrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YardcfsrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
