import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageDetailsComponent } from './mileage-details.component';

describe('MileageDetailsComponent', () => {
  let component: MileageDetailsComponent;
  let fixture: ComponentFixture<MileageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
