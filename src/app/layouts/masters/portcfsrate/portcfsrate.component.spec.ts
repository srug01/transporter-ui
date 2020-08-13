import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortcfsrateComponent } from './portcfsrate.component';

describe('PortcfsrateComponent', () => {
  let component: PortcfsrateComponent;
  let fixture: ComponentFixture<PortcfsrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortcfsrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortcfsrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
