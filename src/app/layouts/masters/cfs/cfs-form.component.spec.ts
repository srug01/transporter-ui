import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsFormComponent } from './cfs-form.component';

describe('CfsFormComponent', () => {
  let component: CfsFormComponent;
  let fixture: ComponentFixture<CfsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
