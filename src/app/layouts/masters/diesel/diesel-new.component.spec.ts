import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselNewComponent } from './diesel-new.component';

describe('DieselNewComponent', () => {
  let component: DieselNewComponent;
  let fixture: ComponentFixture<DieselNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
