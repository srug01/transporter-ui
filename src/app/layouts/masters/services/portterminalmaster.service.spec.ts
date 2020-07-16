import { TestBed } from '@angular/core/testing';

import { PortterminalmasterService } from './portterminalmaster.service';

describe('PortterminalmasterService', () => {
  let service: PortterminalmasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortterminalmasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
