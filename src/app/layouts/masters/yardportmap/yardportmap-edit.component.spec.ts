import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardportmapEditComponent } from './yardportmap-edit.component';

describe('YardportmapEditComponent', () => {
  let component: YardportmapEditComponent;
  let fixture: ComponentFixture<YardportmapEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardportmapEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardportmapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
