import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardportmapMasterListComponent } from './yardportmap-master-list.component';

describe('YardportmapMasterListComponent', () => {
  let component: YardportmapMasterListComponent;
  let fixture: ComponentFixture<YardportmapMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardportmapMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardportmapMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
