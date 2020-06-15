import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardportmapFormComponent } from './yardportmap-form.component';

describe('YardportmapFormComponent', () => {
  let component: YardportmapFormComponent;
  let fixture: ComponentFixture<YardportmapFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardportmapFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardportmapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
