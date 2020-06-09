import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterRegistrationComponent } from './transporter-registration.component';

describe('TransporterRegistrationComponent', () => {
  let component: TransporterRegistrationComponent;
  let fixture: ComponentFixture<TransporterRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
