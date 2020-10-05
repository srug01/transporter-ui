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
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  public roleForm: FormGroup;
  public userrole: Userrole;
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
    this.userrole = this._route.snapshot.data['roleResolver'];
    this.initialiseForm();
  }

  getAllPermissionsForRole() {
    this._roleService.getPermissionsbyRoleId(this.userrole.roleId).subscribe(
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
  }

  initialiseForm() {
    this.roleForm = this.fb.group({
      roleId: [this.userrole.roleId],
      roleName: [this.userrole.roleName, Validators.required],
      is_active: [this.userrole.is_active, Validators.required],
      parentRoleId: [this.userrole.parentRoleId]
    });
    this.getAllPermissionsForRole();
  }

  submitRoleForm(ev) {
    if (ev) {
      ev.preventDefault();
    }
    if (this.roleForm.valid) {
      const formData = this.roleForm.value;
      const userRole = {
        roleName: formData.roleName,
        created_by: this.userId,
        created_on: new Date(),
        is_active: formData.is_active
      } as Userrole;

      this._roleService.addUserRole(userRole).subscribe(
        (res) => {
          console.log(res);
          //this.roleId = res.roleId;
          this.savePermissions();
        },
        (err) => {
          console.log(err);
          this.openSnackBar('Failure !', err.error.error.message);
        }
      );
    } else {
      console.log(this.roleForm);
      this.openSnackBar('Invalid Form !', 'Please review all fields');
    }
  }

  savePermissions() {
    this.submitPermissions = this.adminPermissions.concat(this.cfsPermissions, this.transporterPermissions);
    console.log(this.submitPermissions);
    const filter: ThreeparamObj = {
     // varOne: this.roleId ? this.roleId : 0,
      varTwo: this.userId ? this.userId : 0,
      varThree: this.submitPermissions
    };
    this._roleService.saveRolePermissions(filter).subscribe(
      (permissions) => {
        this._alertService.success('Role Created Successfully', 'Success !');
      },
      (err) => {
        console.log(err);
        this._alertService.error('Role could not be created', 'Failure !');
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
