import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardcfsrateEditComponent } from './yardcfsrate-edit.component';

describe('YardcfsrateEditComponent', () => {
  let component: YardcfsrateEditComponent;
  let fixture: ComponentFixture<YardcfsrateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardcfsrateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardcfsrateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
