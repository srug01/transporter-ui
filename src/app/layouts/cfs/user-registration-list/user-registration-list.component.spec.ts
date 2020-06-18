import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationListComponent } from './user-registration-list.component';

describe('UserRegistrationListComponent', () => {
  let component: UserRegistrationListComponent;
  let fixture: ComponentFixture<UserRegistrationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
