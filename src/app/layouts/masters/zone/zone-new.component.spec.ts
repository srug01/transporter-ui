import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneNewComponent } from './zone-new.component';

describe('ZoneNewComponent', () => {
  let component: ZoneNewComponent;
  let fixture: ComponentFixture<ZoneNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
