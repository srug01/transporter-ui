import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMasterListComponent } from './state-master-list.component';

describe('StateMasterListComponent', () => {
  let component: StateMasterListComponent;
  let fixture: ComponentFixture<StateMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
