import { Cfsuserregistration} from '../../../shared/models/user-registration.model';
import { UserRegistrationService } from './../services/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {CfsService} from './../../masters/services/cfs.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  public userForm: FormGroup;
  confirmPasswordmatcher = new FormErrorStateMatcher();
  cfsTypeErrormatcher = new FormErrorStateMatcher();
  userTypeErrormatcher = new FormErrorStateMatcher();

  public cfsTypes: Array<any> = [];
  public cfsData: Array<any> = [];
  public userTypes: Array<any> = [
    { value: 5, viewValue: 'Super Admin' },
    { value: 6, viewValue: 'Admin' },
    { value: 4, viewValue: 'Viewer' }
  ];
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userRegistrationService: UserRegistrationService,
    private _cfsService: CfsService,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      cfs_user_registration_syscode: [''],
      cfs_syscode: ['', Validators.required],
      user_type_syscode: ['', Validators.required],
      cfs_user_name: ['', Validators.required],
      cfs_user_designation: ['', Validators.required],
      cfs_user_department: ['', Validators.required],
      cfs_user_mobile_no: ['', Validators.required],
      cfs_user_email: ['', Validators.required],
      cfs_user_password: ['', Validators.required],
      cfs_user_confirm_password: ['', Validators.required],
      cfs_user_is_active: ['', Validators.required],
      cfs_user_is_verify: ['', Validators.required]
    },
    {
        validator: this.checkPasswords
    });
    this.getAllCfsMasters();
    // this.getCfsData();
  }


  getAllCfsMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsTypes) => {
        this.cfsTypes = cfsTypes;
      },
      (err) => {
        console.log('could not fetch cfs masters');
      }
    );
  }
  submitUserForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.userForm.valid) {
      this.saveUser(this.userForm);
    } else {console.log(this.userForm);
      this.openSnackBar('Invalid Form !', 'Please Review All Fields');
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('cfs_user_password').value;
    const confirmpassword = group.get('cfs_user_confirm_password').value;
    console.log(password === confirmpassword);
    return password === confirmpassword ? null : { notSame: true };
  }

  saveUser(userForm: any) {
    this._userRegistrationService.saveCfsUserRegistration(userForm.value).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS User Created Successfully');
        this._router.navigate(['/default/cfs/user-list']);
      },
      (err) => {
        console.log('err');
        this.openSnackBar('Failure !', 'Could not create CFS User');
      }
    );
  }

  /* getCfsData() {
    this._userRegistrationService.getCfsUserData(2,4).subscribe(
      (cfsData) => {
        this.cfsData = cfsData;
        console.log(this.cfsData);
      },
      (err) => {
        console.log('could not fetch cfs masters');
      }
    );
  } */


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
