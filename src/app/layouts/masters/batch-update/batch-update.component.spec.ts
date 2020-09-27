import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUpdateComponent } from './batch-update.component';

describe('BatchUpdateComponent', () => {
  let component: BatchUpdateComponent;
  let fixture: ComponentFixture<BatchUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
