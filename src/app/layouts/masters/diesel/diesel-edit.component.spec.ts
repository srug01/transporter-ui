import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselEditComponent } from './diesel-edit.component';

describe('DieselEditComponent', () => {
  let component: DieselEditComponent;
  let fixture: ComponentFixture<DieselEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
