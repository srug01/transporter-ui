import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';
import { UserManagementService } from '../services/usermanagement.service';
import { FourParamObj } from 'src/app/shared/models/FourParamObj';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public searchFilter: FourParamObj = new FourParamObj();
  public users: MatTableDataSource<User>;
  public roles: [] = [];
  displayedColumns: string[] = [
    '#', 'email', 'firstName', 'lastName', 'mobileNumber', 'role', 'action'
  ];

  constructor(
    private _userService: UserManagementService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }

  applyFilter() {
    console.log(JSON.stringify(this.searchFilter));
    this._userService.getUserLists(this.searchFilter).subscribe(
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
    this._userService.getUserLists(this.searchFilter).subscribe(
      (users) => {
        this.users = new MatTableDataSource<User>(users);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
