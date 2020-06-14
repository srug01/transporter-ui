import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardcfsrateDetailsComponent } from './yardcfsrate-details.component';

describe('YardcfsrateDetailsComponent', () => {
  let component: YardcfsrateDetailsComponent;
  let fixture: ComponentFixture<YardcfsrateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardcfsrateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardcfsrateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
