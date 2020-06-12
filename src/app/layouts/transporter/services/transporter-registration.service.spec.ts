import { TestBed } from '@angular/core/testing';

import { TransporterRegistrationService } from './transporter-registration.service';

describe('TransporterRegistrationService', () => {
  let service: TransporterRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransporterRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
