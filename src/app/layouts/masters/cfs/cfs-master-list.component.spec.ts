import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsMasterListComponent } from './cfs-master-list.component';

describe('CfsMasterListComponent', () => {
  let component: CfsMasterListComponent;
  let fixture: ComponentFixture<CfsMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
