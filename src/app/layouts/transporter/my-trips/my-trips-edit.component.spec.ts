import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripsEditComponent } from './my-trips-edit.component';

describe('MyTripsEditComponent', () => {
  let component: MyTripsEditComponent;
  let fixture: ComponentFixture<MyTripsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTripsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
