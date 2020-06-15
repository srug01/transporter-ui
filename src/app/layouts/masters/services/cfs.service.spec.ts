import { TestBed } from '@angular/core/testing';

import { CfsService } from './cfs.service';

describe('CfsService', () => {
  let service: CfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
