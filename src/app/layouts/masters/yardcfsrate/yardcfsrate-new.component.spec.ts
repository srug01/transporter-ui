import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardcfsrateNewComponent } from './yardcfsrate-new.component';

describe('YardcfsrateNewComponent', () => {
  let component: YardcfsrateNewComponent;
  let fixture: ComponentFixture<YardcfsrateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardcfsrateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardcfsrateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
