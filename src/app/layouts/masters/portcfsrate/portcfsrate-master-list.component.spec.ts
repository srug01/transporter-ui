import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortcfsrateMasterListComponent } from './portcfsrate-master-list.component';

describe('PortcfsrateMasterListComponent', () => {
  let component: PortcfsrateMasterListComponent;
  let fixture: ComponentFixture<PortcfsrateMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortcfsrateMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortcfsrateMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
