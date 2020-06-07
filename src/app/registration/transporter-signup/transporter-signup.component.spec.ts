import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterSignupComponent } from './transporter-signup.component';

describe('TransporterSignupComponent', () => {
  let component: TransporterSignupComponent;
  let fixture: ComponentFixture<TransporterSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
