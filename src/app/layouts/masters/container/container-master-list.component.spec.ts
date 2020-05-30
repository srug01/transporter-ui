import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerMasterListComponent } from './container-master-list.component';

describe('ContainerMasterListComponent', () => {
  let component: ContainerMasterListComponent;
  let fixture: ComponentFixture<ContainerMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
