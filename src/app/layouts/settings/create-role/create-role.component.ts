import { Permission } from './../../../shared/models/permission';
import { Userrole } from './../../../shared/models/userrole';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  public roleForm: FormGroup;
  cfsPermissions: Permission[] = [];
  transporterPermissions: Permission[] = [];
  adminPermissions: Permission[] = [];
  cfsToggleAll: boolean = false;
  transporterToggleAll: boolean = false;
  adminToggleAll: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _roleService: RoleService,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
    this.getAllPermissions();
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
    if(this.roleForm.valid) {

    } else {
      this._alertService.error('Please review all fields', 'Invalid Form!');
    }
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

}
