import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from 'src/app/shared/models/user';
import { UserManagementService } from '../services/usermanagement.service';
import { FourParamObj } from 'src/app/shared/models/FourParamObj';
import { RoleService } from '../services/role.service';
import { UserroleService } from 'src/app/services/userrole.service';
import { Userrole } from 'src/app/shared/models/userrole';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public searchFilter: FourParamObj = new FourParamObj();
  public users: MatTableDataSource<User>;
  public roles: [] = [];
  public roleId = parseInt(localStorage.getItem('roleID'), 10);
  public isRoleEditable: boolean;

  displayedColumns: string[] = [
    '#', 'email', 'firstName', 'lastName', 'mobileNumber', 'role', 'action'
  ];

  constructor(
    private _userManagementService: UserManagementService,
    private roleService: RoleService,

  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();

  }

  applyFilter() {
    console.log(JSON.stringify(this.searchFilter));
    this._userManagementService.getUserLists(this.searchFilter).subscribe(
      (users) => {
        this.users = new MatTableDataSource<User>(users);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (roles) => {
        this.roles = roles;
      },
      (err) => {
        console.log(err);
      }
    );
  }



  resetFilter() {
    this.searchFilter = new FourParamObj();
  }

  getAllUsers() {
    this._userManagementService.getUserLists(this.searchFilter).subscribe(
      (users) => {
        this.users = new MatTableDataSource<User>(users);

      },
      (err) => {
        console.log(err);
      }
    );
  }

}
