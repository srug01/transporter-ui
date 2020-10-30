import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidlogicComponent } from './bidlogic.component';

describe('BidlogicComponent', () => {
  let component: BidlogicComponent;
  let fixture: ComponentFixture<BidlogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidlogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidlogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
