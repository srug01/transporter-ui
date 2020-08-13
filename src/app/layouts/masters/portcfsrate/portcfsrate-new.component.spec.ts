import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortcfsrateNewComponent } from './portcfsrate-new.component';

describe('PortcfsrateNewComponent', () => {
  let component: PortcfsrateNewComponent;
  let fixture: ComponentFixture<PortcfsrateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortcfsrateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortcfsrateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
