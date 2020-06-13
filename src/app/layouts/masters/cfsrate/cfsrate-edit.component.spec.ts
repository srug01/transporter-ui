import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsrateEditComponent } from './cfsrate-edit.component';

describe('CfsrateEditComponent', () => {
  let component: CfsrateEditComponent;
  let fixture: ComponentFixture<CfsrateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsrateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsrateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
