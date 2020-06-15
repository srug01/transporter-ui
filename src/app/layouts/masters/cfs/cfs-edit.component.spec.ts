import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsEditComponent } from './cfs-edit.component';

describe('CfsEditComponent', () => {
  let component: CfsEditComponent;
  let fixture: ComponentFixture<CfsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
