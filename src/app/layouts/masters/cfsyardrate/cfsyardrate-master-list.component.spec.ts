import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsyardrateMasterListComponent } from './cfsyardrate-master-list.component';

describe('CfsyardrateMasterListComponent', () => {
  let component: CfsyardrateMasterListComponent;
  let fixture: ComponentFixture<CfsyardrateMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsyardrateMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsyardrateMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
