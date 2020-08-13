import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsyardrateDetailsComponent } from './cfsyardrate-details.component';

describe('CfsyardrateDetailsComponent', () => {
  let component: CfsyardrateDetailsComponent;
  let fixture: ComponentFixture<CfsyardrateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsyardrateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsyardrateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
