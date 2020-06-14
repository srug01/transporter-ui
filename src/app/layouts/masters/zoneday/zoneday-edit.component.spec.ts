import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonedayEditComponent } from './zoneday-edit.component';

describe('ZonedayEditComponent', () => {
  let component: ZonedayEditComponent;
  let fixture: ComponentFixture<ZonedayEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonedayEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonedayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
