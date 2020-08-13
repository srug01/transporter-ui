import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsyardrateNewComponent } from './cfsyardrate-new.component';

describe('CfsyardrateNewComponent', () => {
  let component: CfsyardrateNewComponent;
  let fixture: ComponentFixture<CfsyardrateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsyardrateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsyardrateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
