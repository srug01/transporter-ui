import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfsNewComponent } from './cfs-new.component';

describe('CfsNewComponent', () => {
  let component: CfsNewComponent;
  let fixture: ComponentFixture<CfsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
