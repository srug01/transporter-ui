import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsEditComponent } from './trips-edit.component';

describe('TripsEditComponent', () => {
  let component: TripsEditComponent;
  let fixture: ComponentFixture<TripsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
