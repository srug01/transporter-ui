import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsDetailsComponent } from './cfs-details.component';

describe('CfsDetailsComponent', () => {
  let component: CfsDetailsComponent;
  let fixture: ComponentFixture<CfsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
