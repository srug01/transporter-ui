import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardMasterListComponent } from './yard-master-list.component';

describe('YardMasterListComponent', () => {
  let component: YardMasterListComponent;
  let fixture: ComponentFixture<YardMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
