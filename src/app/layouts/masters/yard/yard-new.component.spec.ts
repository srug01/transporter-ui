import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardNewComponent } from './yard-new.component';

describe('YardNewComponent', () => {
  let component: YardNewComponent;
  let fixture: ComponentFixture<YardNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
