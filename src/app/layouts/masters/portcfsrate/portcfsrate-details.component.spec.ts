import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortcfsrateDetailsComponent } from './portcfsrate-details.component';

describe('PortcfsrateDetailsComponent', () => {
  let component: PortcfsrateDetailsComponent;
  let fixture: ComponentFixture<PortcfsrateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortcfsrateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortcfsrateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
