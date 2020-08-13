import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsyardrateEditComponent } from './cfsyardrate-edit.component';

describe('CfsyardrateEditComponent', () => {
  let component: CfsyardrateEditComponent;
  let fixture: ComponentFixture<CfsyardrateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsyardrateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsyardrateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
