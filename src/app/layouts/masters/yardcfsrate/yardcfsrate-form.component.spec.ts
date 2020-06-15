import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardcfsrateFormComponent } from './yardcfsrate-form.component';

describe('YardcfsrateFormComponent', () => {
  let component: YardcfsrateFormComponent;
  let fixture: ComponentFixture<YardcfsrateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardcfsrateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardcfsrateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
