import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  public userForm: FormGroup;
  cfsTypeErrormatcher = new FormErrorStateMatcher();
  userTypeErrormatcher = new FormErrorStateMatcher();

  public cfsTypes: Array<any> = [
    { value: 'cfs-1', viewValue: 'cfs-1' },
    { value: 'cfs-2', viewValue: 'cfs-2' },
    { value: 'cfs-3', viewValue: 'cfs-3' },
    { value: 'cfs-4', viewValue: 'cfs-4' }
  ];
  public userTypes: Array<any> = [
    { value: 'transporter', viewValue: 'transporter' },
    { value: 'driver', viewValue: 'driver' },
    { value: 'user', viewValue: 'user' }
  ];
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      cfs_type: ['', Validators.required],
      user_type: ['', Validators.required],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      is_active: ['', Validators.required],
      is_verified: ['', Validators.required]
    });
  }

  submitUserForm(ev) {
    if(ev) {
      ev.preventDefault();
    }
  }

}
