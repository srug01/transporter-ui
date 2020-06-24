import { TestBed } from '@angular/core/testing';

import { MasterTypeService } from './master-type.service';

describe('MasterTypeService', () => {
  let service: MasterTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
