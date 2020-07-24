import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTripsNewComponent } from './my-trips-new.component';

describe('MyTripsNewComponent', () => {
  let component: MyTripsNewComponent;
  let fixture: ComponentFixture<MyTripsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTripsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTripsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
