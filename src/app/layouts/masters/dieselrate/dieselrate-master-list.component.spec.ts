import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselrateMasterListComponent } from './dieselrate-master-list.component';

describe('DieselrateMasterListComponent', () => {
  let component: DieselrateMasterListComponent;
  let fixture: ComponentFixture<DieselrateMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselrateMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselrateMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
