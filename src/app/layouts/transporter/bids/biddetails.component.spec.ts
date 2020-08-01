import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddetailsComponent } from './biddetails.component';

describe('BiddetailsComponent', () => {
  let component: BiddetailsComponent;
  let fixture: ComponentFixture<BiddetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
