import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBidDialogComponent } from './confirm-bid-dialog.component';

describe('ConfirmBidDialogComponent', () => {
  let component: ConfirmBidDialogComponent;
  let fixture: ComponentFixture<ConfirmBidDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBidDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
