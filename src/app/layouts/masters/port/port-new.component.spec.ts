import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortNewComponent } from './port-new.component';

describe('PortNewComponent', () => {
  let component: PortNewComponent;
  let fixture: ComponentFixture<PortNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
