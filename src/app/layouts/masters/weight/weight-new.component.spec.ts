import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightNewComponent } from './weight-new.component';

describe('WeightNewComponent', () => {
  let component: WeightNewComponent;
  let fixture: ComponentFixture<WeightNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
