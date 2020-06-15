import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardportmapNewComponent } from './yardportmap-new.component';

describe('YardportmapNewComponent', () => {
  let component: YardportmapNewComponent;
  let fixture: ComponentFixture<YardportmapNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardportmapNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardportmapNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
