import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsyardrateComponent } from './cfsyardrate.component';

describe('CfsyardrateComponent', () => {
  let component: CfsyardrateComponent;
  let fixture: ComponentFixture<CfsyardrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsyardrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsyardrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
