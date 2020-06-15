import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonedayNewComponent } from './zoneday-new.component';

describe('ZonedayNewComponent', () => {
  let component: ZonedayNewComponent;
  let fixture: ComponentFixture<ZonedayNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonedayNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonedayNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
