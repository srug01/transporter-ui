import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortMasterListComponent } from './port-master-list.component';

describe('PortMasterListComponent', () => {
  let component: PortMasterListComponent;
  let fixture: ComponentFixture<PortMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
