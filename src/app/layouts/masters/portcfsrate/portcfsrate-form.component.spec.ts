import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortcfsrateFormComponent } from './portcfsrate-form.component';

describe('PortcfsrateFormComponent', () => {
  let component: PortcfsrateFormComponent;
  let fixture: ComponentFixture<PortcfsrateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortcfsrateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortcfsrateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
