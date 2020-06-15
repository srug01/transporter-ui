import { TestBed } from '@angular/core/testing';

import { ZonedayService } from './zoneday.service';

describe('ZonedayService', () => {
  let service: ZonedayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonedayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
