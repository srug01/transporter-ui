import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsrateNewComponent } from './cfsrate-new.component';

describe('CfsrateNewComponent', () => {
  let component: CfsrateNewComponent;
  let fixture: ComponentFixture<CfsrateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsrateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsrateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
