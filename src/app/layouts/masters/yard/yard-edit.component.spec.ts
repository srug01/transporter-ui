import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardEditComponent } from './yard-edit.component';

describe('YardEditComponent', () => {
  let component: YardEditComponent;
  let fixture: ComponentFixture<YardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
