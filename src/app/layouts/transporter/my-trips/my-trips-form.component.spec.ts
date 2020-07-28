import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripsFormComponent } from './my-trips-form.component';

describe('MyTripsFormComponent', () => {
  let component: MyTripsFormComponent;
  let fixture: ComponentFixture<MyTripsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTripsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
