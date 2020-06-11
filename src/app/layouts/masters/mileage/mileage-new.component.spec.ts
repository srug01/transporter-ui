import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MileageNewComponent } from './mileage-new.component';

describe('MileageNewComponent', () => {
  let component: MileageNewComponent;
  let fixture: ComponentFixture<MileageNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileageNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
