import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsrateDetailsComponent } from './cfsrate-details.component';

describe('CfsrateDetailsComponent', () => {
  let component: CfsrateDetailsComponent;
  let fixture: ComponentFixture<CfsrateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsrateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsrateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
