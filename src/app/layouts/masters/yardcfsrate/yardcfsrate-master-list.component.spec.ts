import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardcfsrateMasterListComponent } from './yardcfsrate-master-list.component';

describe('YardcfsrateMasterListComponent', () => {
  let component: YardcfsrateMasterListComponent;
  let fixture: ComponentFixture<YardcfsrateMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardcfsrateMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardcfsrateMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
