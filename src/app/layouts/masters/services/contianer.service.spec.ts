import { TestBed } from '@angular/core/testing';

import { ContianerService } from './contianer.service';

describe('ContianerService', () => {
  let service: ContianerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContianerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
