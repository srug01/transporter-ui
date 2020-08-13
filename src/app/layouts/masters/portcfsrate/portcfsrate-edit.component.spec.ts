import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortcfsrateEditComponent } from './portcfsrate-edit.component';

describe('PortcfsrateEditComponent', () => {
  let component: PortcfsrateEditComponent;
  let fixture: ComponentFixture<PortcfsrateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortcfsrateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortcfsrateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
