import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageMasterListComponent } from './mileage-master-list.component';

describe('MileageMasterListComponent', () => {
  let component: MileageMasterListComponent;
  let fixture: ComponentFixture<MileageMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileageMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
