import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardFormComponent } from './yard-form.component';

describe('YardFormComponent', () => {
  let component: YardFormComponent;
  let fixture: ComponentFixture<YardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
