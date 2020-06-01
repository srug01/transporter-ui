import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerNewComponent } from './container-new.component';

describe('ContainerNewComponent', () => {
  let component: ContainerNewComponent;
  let fixture: ComponentFixture<ContainerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
