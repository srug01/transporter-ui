import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMasterListComponent } from './driver-master-list.component';

describe('DriverMasterListComponent', () => {
  let component: DriverMasterListComponent;
  let fixture: ComponentFixture<DriverMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
