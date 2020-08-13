import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsyardrateFormComponent } from './cfsyardrate-form.component';

describe('CfsyardrateFormComponent', () => {
  let component: CfsyardrateFormComponent;
  let fixture: ComponentFixture<CfsyardrateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsyardrateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsyardrateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
