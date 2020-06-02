import { TestBed } from '@angular/core/testing';

import { YardportmapService } from './yardportmap.service';

describe('YardportmapService', () => {
  let service: YardportmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YardportmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
