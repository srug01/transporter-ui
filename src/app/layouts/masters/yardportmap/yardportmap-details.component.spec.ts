import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardportmapDetailsComponent } from './yardportmap-details.component';

describe('YardportmapDetailsComponent', () => {
  let component: YardportmapDetailsComponent;
  let fixture: ComponentFixture<YardportmapDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardportmapDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardportmapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
