import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonedayFormComponent } from './zoneday-form.component';

describe('ZonedayFormComponent', () => {
  let component: ZonedayFormComponent;
  let fixture: ComponentFixture<ZonedayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonedayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonedayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
