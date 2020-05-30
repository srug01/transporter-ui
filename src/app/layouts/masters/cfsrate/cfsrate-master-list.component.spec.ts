import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsrateMasterListComponent } from './cfsrate-master-list.component';

describe('CfsrateMasterListComponent', () => {
  let component: CfsrateMasterListComponent;
  let fixture: ComponentFixture<CfsrateMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsrateMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsrateMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
