import { CfsUserRegistration } from './../../../shared/models/cfsUserRegistration';
import { Cfs } from './../../../shared/models/cfs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../services/user-registration.service';
import { UserroleService } from 'src/app/services/userrole.service';
import { CfsService } from '../../masters/services/cfs.service';
import { UserService } from 'src/app/services/user.service';
import { MasterTypeService } from '../services/master-type.service';
import { FormErrorStateMatcher } from 'src/app/shared/matchers/error.matcher';
import { User } from 'src/app/shared/models/user';
import { Userrole } from 'src/app/shared/models/userrole';

@Component({
  selector: 'app-user-registration-edit',
  templateUrl: './user-registration-edit.component.html',
  styleUrls: ['./user-registration-edit.component.scss']
})
export class UserRegistrationEditComponent implements OnInit {
  userRegistrationDetails: CfsUserRegistration;
  userForm: FormGroup;
  confirmPasswordmatcher = new FormErrorStateMatcher();
  cfsTypeErrormatcher = new FormErrorStateMatcher();
  userTypeErrormatcher = new FormErrorStateMatcher();
  public currentUser: User;
  public cfsTypes: Array<Cfs> = [];
  public cfsData: Array<any> = [];
  public cfsRoles: Array<any> = [];
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userRegistrationService: UserRegistrationService,
    private _userRoleService: UserroleService,
    private _cfsService: CfsService,
    private _router: Router,
    private _userService: UserService,
    private _masterTypeService: MasterTypeService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllCFSbyUserId();
    this.getAllcfsRoles();
    this.userRegistrationDetails = this.route.snapshot.data['userRegistrationResolver'];
    if (this.userRegistrationDetails) {
      this.pupulateForm();
    }
  }

  pupulateForm() {
    this.userForm = this.fb.group({
      cfsUserRegistrationId: [this.userRegistrationDetails.cfsUserRegistrationId ? this.userRegistrationDetails.cfsUserRegistrationId : ''],
      cfsMasterId: [this.userRegistrationDetails.cfsMasterId ? this.userRegistrationDetails.cfsMasterId : '', Validators.required],
      userTypeId: [this.userRegistrationDetails.userTypeId ? this.userRegistrationDetails.userTypeId : '', Validators.required],
      cfsUserName: [this.userRegistrationDetails.cfsUserName ? this.userRegistrationDetails.cfsUserName : '', Validators.required],
      cfsUserDesignation: [this.userRegistrationDetails.cfsUserDesignation ? this.userRegistrationDetails.cfsUserDesignation : ''],
      cfsUserDepartment: [this.userRegistrationDetails.cfsUserDepartment ? this.userRegistrationDetails.cfsUserDepartment : ''],
      cfsUserMobileNumber: [
        this.userRegistrationDetails.cfsUserMobileNumber ? this.userRegistrationDetails.cfsUserMobileNumber : '',
        Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])
      ],
      cfsUserEmail: [
        this.userRegistrationDetails.cfsUserEmail ? this.userRegistrationDetails.cfsUserEmail : '',
        Validators.compose([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'), Validators.required])
      ],
      cfsUserPassword: [
        this.userRegistrationDetails.cfsUserPassword ? this.userRegistrationDetails.cfsUserPassword : '', Validators.required
      ],
      cfsUserConfirmPassword: [
        this.userRegistrationDetails.cfsUserPassword ? this.userRegistrationDetails.cfsUserPassword : '', Validators.required
      ],
      userId: [this.userRegistrationDetails.userId ? this.userRegistrationDetails.userId : ''],
      isActive: [this.userRegistrationDetails.isActive ? this.userRegistrationDetails.isActive : true, Validators.required],
      isVerified: [this.userRegistrationDetails.isVerified ? this.userRegistrationDetails.isVerified : '', Validators.required],
      createdBy: [this.userRegistrationDetails.createdBy? this.userRegistrationDetails.createdBy : ''],
      createdOn: [this.userRegistrationDetails.createdOn? this.userRegistrationDetails.createdOn : ''],
      modifiedBy: [this.userRegistrationDetails.modifiedBy? this.userRegistrationDetails.modifiedBy : ''],
      modifiedOn: [this.userRegistrationDetails.modifiedOn? this.userRegistrationDetails.modifiedOn : ''],
    }, {
      validator: this.checkPasswords
    });
  }

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
      userId: cfsUserRegistration.userId,
      isActive: cfsUserRegistration.isActive,
      isVerified: cfsUserRegistration.isVerified,
      createdBy: this.currentUser.userId,
      createdOn: new Date(),
      modifiedBy: this.currentUser.userId,
      modifiedOn: new Date(),
    } as CfsUserRegistration;
  }

  saveUser(userRegistration: CfsUserRegistration) {
    this._userRegistrationService.updateCfsUserRegistration(userRegistration).subscribe(
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

  checkPasswords(group: FormGroup) {
    const password = group.get('cfsUserPassword').value;
    const confirmpassword = group.get('cfsUserConfirmPassword').value;
    return password === confirmpassword ? null : { notSame: true };
  }

  cancel(ev) {
    if(ev){
      ev.preventDefault();
    }
    this._router.navigate(['/default/cfs/user-list']);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
