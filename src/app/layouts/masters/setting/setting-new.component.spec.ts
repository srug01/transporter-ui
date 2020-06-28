import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNewComponent } from './setting-new.component';

describe('SettingNewComponent', () => {
  let component: SettingNewComponent;
  let fixture: ComponentFixture<SettingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
