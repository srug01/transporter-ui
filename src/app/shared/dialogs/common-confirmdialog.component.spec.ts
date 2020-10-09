import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonConfirmdialogComponent } from './common-confirmdialog.component';

describe('CommonConfirmdialogComponent', () => {
  let component: CommonConfirmdialogComponent;
  let fixture: ComponentFixture<CommonConfirmdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonConfirmdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonConfirmdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
