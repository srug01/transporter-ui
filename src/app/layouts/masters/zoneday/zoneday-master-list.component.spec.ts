import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonedayMasterListComponent } from './zoneday-master-list.component';

describe('ZonedayMasterListComponent', () => {
  let component: ZonedayMasterListComponent;
  let fixture: ComponentFixture<ZonedayMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonedayMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonedayMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
