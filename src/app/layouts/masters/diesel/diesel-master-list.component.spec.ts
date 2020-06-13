import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselMasterListComponent } from './diesel-master-list.component';

describe('DieselMasterListComponent', () => {
  let component: DieselMasterListComponent;
  let fixture: ComponentFixture<DieselMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
