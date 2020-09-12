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
import { Userrole } from 'src/app/shared/models/userrole';
import { UserroleService } from './../../../services/userrole.service';
import { MasterTypeService } from './../../cfs/services/master-type.service';


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
  public cfsRoles: Array<any> = [];
  public userId = parseInt(localStorage.getItem('userID'), 10);
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userRegistrationService: UserRegistrationService,
    private _userRoleService: UserroleService,
    private _cfsService: CfsService,
    private _router: Router,
    private _userService: UserService,
    private _masterTypeService : MasterTypeService

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
      cfsUserMobileNumber: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])],
      cfsUserEmail: ['', Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])],
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
    this.getAllCFSbyUserId();
    this.getAllcfsRoles();
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

  getAllCFSbyUserId() {
    this._masterTypeService.getAllCFSbyUserId(this.userId).subscribe(
      (cfsMasters) => {
        this.cfsTypes = cfsMasters;
      },
      (err) => {
        console.log(err);
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

  getAllcfsRoles() {
    this._userRoleService.getAllCFSUserroles(4).subscribe(
      (cfsRoles: Userrole[]) => {
        this.cfsRoles = cfsRoles;
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
        console.log(err);
        if (err.error.error.code === 'ER_DUP_ENTRY') {
          this.openSnackBar('Failure !', 'Duplicate Email Specified');
        } else {
          this.openSnackBar('Failure !', 'Could not create CFS User');
        }
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
