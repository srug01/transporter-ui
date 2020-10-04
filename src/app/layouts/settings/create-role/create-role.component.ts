import { Permission } from './../../../shared/models/permission';
import { Userrole } from './../../../shared/models/userrole';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ThreeparamObj } from 'src/app/shared/models/threeparamObj';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  public roleForm: FormGroup;
  public roleId: number;
  cfsPermissions: Permission[] = [];
  transporterPermissions: Permission[] = [];
  adminPermissions: Permission[] = [];
  submitPermissions: Permission[] = [];
  cfsToggleAll: boolean = false;
  transporterToggleAll: boolean = false;
  adminToggleAll: boolean = false;
  public userId = parseInt(localStorage.getItem('userID'), 10);

  constructor(
    private fb: FormBuilder,
    private _roleService: RoleService,
    private _alertService: AlertService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
    this.getAllPermissions();
    this.getroleIdFromRouteParams();
  }

  getroleIdFromRouteParams() {
    this._route.params.subscribe(
      (params) => {
        this.roleId = params.id;
      }
    );
  }

  getAllPermissions() {
    this._roleService.getAllPermissions().subscribe(
      (permissions: Permission[]) => {
        this.transformPermissions(permissions);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  transformPermissions(permissions: Permission[]) {
    for (const permission of permissions) {
      if (permission.permissionName.startsWith('admin')) {
        this.adminPermissions.push(permission);
      } else if (permission.permissionName.startsWith('cfs')) {
        this.cfsPermissions.push(permission);
      } else if (permission.permissionName.startsWith('transporter')) {
        this.transporterPermissions.push(permission);
      } else {
        this.adminPermissions.push(permission);
      }
    }
    console.log(this.cfsPermissions);
    console.log(this.adminPermissions);
    console.log(this.transporterPermissions);
  }

  initialiseForm() {
    this.roleForm = this.fb.group({
      roleId: [''],
      roleName: ['', Validators.required],
      is_active: ['', Validators.required],
      parentRoleId: ['']
    });
  }

  submitRoleForm(ev) {

console.log(this.roleForm);
if (ev) {
  ev.preventDefault();
}
if (this.roleForm.valid) {
  const formData = this.roleForm.value;
if(this.roleId == 0)
{
  const userRole = {
    roleName : formData.roleName,
    created_by: this.userId,
    created_on: new Date(),
    is_active: true
  } as Userrole;

    this._roleService.addUserRole(userRole).subscribe(
      (res) => {
        console.log(res);
        this.roleId = res.roleId;
        this.savePermissions();
      },
      (err) => {
        console.log(err);
        this.openSnackBar('Failure !', err.error.error.message);
      }
    );

}else {
  this.openSnackBar('Invalid Form !', 'Please review all fields');
}
}





 /*    if(this.roleForm.valid) {

    } else {
      this._alertService.error('Please review all fields', 'Invalid Form!');
    } */
  }

  savePermissions(){
    this.submitPermissions = this.adminPermissions.concat(this.cfsPermissions,this.transporterPermissions);
    console.log(this.submitPermissions);
const filter: ThreeparamObj = {
  varOne: this.roleId ? this.roleId : 0,
  varTwo: this.userId ? this.userId : 0,
  varThree: this.submitPermissions
};


this._roleService.saveRolePermissions(filter).subscribe(
  (permissions) => {
    //this.bids = new MatTableDataSource(bids);

  },
  (err) => {
    console.log(err);
  }
);

  }

  toggleAllCfs() {
    this.cfsToggleAll = !this.cfsToggleAll;
    this.cfsPermissions.forEach((cfsPermission: Permission) => {
      cfsPermission.isActive = this.cfsToggleAll;
    });
  }
  toggleAllTransporter() {
    this.transporterToggleAll = !this.transporterToggleAll;
    this.transporterPermissions.forEach((transporterPermission: Permission) => {
      transporterPermission.isActive = this.transporterToggleAll;
    });
  }

  toggleAllAdmin() {
    this.adminToggleAll = !this.adminToggleAll;
    this.adminPermissions.forEach((adminPermission: Permission) => {
      adminPermission.isActive = this.adminToggleAll;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
