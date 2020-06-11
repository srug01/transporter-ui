import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageEditComponent } from './mileage-edit.component';

describe('MileageEditComponent', () => {
  let component: MileageEditComponent;
  let fixture: ComponentFixture<MileageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
