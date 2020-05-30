import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMasterListComponent } from './zone-master-list.component';

describe('ZoneMasterListComponent', () => {
  let component: ZoneMasterListComponent;
  let fixture: ComponentFixture<ZoneMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
