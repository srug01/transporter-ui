import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightMasterListComponent } from './weight-master-list.component';

describe('WeightMasterListComponent', () => {
  let component: WeightMasterListComponent;
  let fixture: ComponentFixture<WeightMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
