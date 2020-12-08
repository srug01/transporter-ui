import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardUpdateComponent } from './yard-update.component';

describe('YardUpdateComponent', () => {
  let component: YardUpdateComponent;
  let fixture: ComponentFixture<YardUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
