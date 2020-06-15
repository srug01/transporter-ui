import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonedayDetailsComponent } from './zoneday-details.component';

describe('ZonedayDetailsComponent', () => {
  let component: ZonedayDetailsComponent;
  let fixture: ComponentFixture<ZonedayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonedayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonedayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
