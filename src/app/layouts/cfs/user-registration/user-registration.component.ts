import { UserService } from './../../../services/user.service';
import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Cfs } from './../../../shared/models/cfs';
import { UserRegistrationService } from './../services/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorStateMatcher } from './../../../shared/matchers/error.matcher';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CfsService } from './../../masters/services/cfs.service';
import { User } from 'src/app/shared/models/user';

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
  public currentUser: User;

  public cfsTypes: Array<Cfs> = [];
  public cfsData: Array<any> = [];
  public userTypes: Array<any> = [
    { value: 5, viewValue: 'Cfs Super Admin' },
    { value: 6, viewValue: 'Cfs Admin' },
    { value: 4, viewValue: 'Cfs Viewer' }
  ];
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userRegistrationService: UserRegistrationService,
    private _cfsService: CfsService,
    private _router: Router,
    private _userService: UserService

  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.userForm = this.fb.group({
      cfsUserRegistrationId: [''],
      cfsMasterId: ['', Validators.required],
      userTypeId: ['', Validators.required],
      cfsUserName: ['', Validators.required],
      cfsUserDesignation: ['', Validators.required],
      cfsUserDepartment: ['', Validators.required],
      cfsUserMobileNumber: ['', Validators.required],
      cfsUserEmail: ['', Validators.required],
      cfsUserPassword: ['', Validators.required],
      cfsUserConfirmPassword: ['', Validators.required],
      userId: [''],
      isActive: ['', Validators.required],
      isVerified: ['', Validators.required],
      createdBy: [''],
      createdOn: [''],
      modifiedBy: [''],
      modifiedOn: [''],
    }, {
      validator: this.checkPasswords
    });
    this.getAllCfsMasters();
    // this.getCfsData();
  }

  /**
   *  Getters
   * @param ev 
   */
  getAllCfsMasters() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsTypes) => {
        this.cfsTypes = cfsTypes;
      },
      (err) => {
      }
    );
  }

  getUserInfo() {
    this._userService.getUsersInfo().subscribe(
      (loggedUser: User) => {
        this.currentUser = loggedUser;
      }
    );
  }


  /**
   *  Form Methods
   * @param ev 
   */
  submitUserForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.userForm.valid) {
      const userRegistration: CfsUserRegistration = this.transformCfsUserObj(this.userForm.value);
      this.saveUser(userRegistration);
    } else {
      this.openSnackBar('Invalid Form !', 'Please Review All Fields');
    }
  }

  transformCfsUserObj(cfsUserRegistration: CfsUserRegistration): CfsUserRegistration {
    return {
      cfsUserRegistrationId: cfsUserRegistration.cfsUserRegistrationId,
      cfsMasterId: cfsUserRegistration.cfsMasterId,
      userTypeId: cfsUserRegistration.userTypeId,
      cfsUserName: cfsUserRegistration.cfsUserName,
      cfsUserDesignation: cfsUserRegistration.cfsUserDesignation,
      cfsUserDepartment: cfsUserRegistration.cfsUserDepartment,
      cfsUserMobileNumber: cfsUserRegistration.cfsUserMobileNumber,
      cfsUserEmail: cfsUserRegistration.cfsUserEmail,
      cfsUserPassword: cfsUserRegistration.cfsUserPassword,
      userId: 0,
      isActive: cfsUserRegistration.isActive,
      isVerified: cfsUserRegistration.isVerified,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
    } as CfsUserRegistration;
  }

  saveUser(userRegistration: CfsUserRegistration) {
    this._userRegistrationService.saveCfsUserRegistration(userRegistration).subscribe(
      (res) => {
        this.openSnackBar('Success !', 'CFS User Created Successfully');
        this._router.navigate(['/default/cfs/user-list']);
      },
      (err) => {
        this.openSnackBar('Failure !', 'Could not create CFS User');
      }
    );
  }

  /**
   *  Misc Methods
   * @param group 
   */

  checkPasswords(group: FormGroup) {
    const password = group.get('cfsUserPassword').value;
    const confirmpassword = group.get('cfsUserConfirmPassword').value;
    return password === confirmpassword ? null : { notSame: true };
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
