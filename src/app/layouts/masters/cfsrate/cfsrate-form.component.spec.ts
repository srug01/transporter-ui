import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsrateFormComponent } from './cfsrate-form.component';

describe('CfsrateFormComponent', () => {
  let component: CfsrateFormComponent;
  let fixture: ComponentFixture<CfsrateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsrateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsrateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
