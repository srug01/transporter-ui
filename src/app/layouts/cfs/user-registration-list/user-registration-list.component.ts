import { Cfs } from './../../../shared/models/cfs';
import { UserRegistrationService } from './../services/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { CfsService } from '../../masters/services/cfs.service';
import { User } from 'src/app/shared/models/user';
import { MatTableDataSource } from '@angular/material/table';
import { CfsUserRegistration } from 'src/app/shared/models/cfsUserRegistration';

@Component({
  selector: 'app-user-registration-list',
  templateUrl: './user-registration-list.component.html',
  styleUrls: ['./user-registration-list.component.scss']
})
export class UserRegistrationListComponent implements OnInit {
  displayedColumns: string[] = [
    'cfsUserRegistrationId', 'cfsUserName', 'userTypeId',
    'cfsUserDesignation', 'cfsUserDepartment', 'isActive',
    'isVerified', 'action'
  ];
  public users: MatTableDataSource<CfsUserRegistration>;
  public userId = parseInt(localStorage.getItem('userID'), 10);
  public cfsMasters: Cfs[] = [];
  public currentCFSUser: any;
  public cfsUsers: Array<any> = [];
  constructor(
    private _userregistrationService: UserRegistrationService,
    private _cfsService: CfsService
  ) { }

  ngOnInit(): void {
    this._userregistrationService.getAllCfsUserRegistration().subscribe(
      (users) => {
        this.cfsUsers = users;
        this.currentCFSUser = this.cfsUsers.filter(a=> a.userId == this.userId);
        if(this.currentCFSUser.length > 0)
        {
          users = users.filter(m=> m.cfsMasterId == this.currentCFSUser[0].cfsMasterId)
        }
        this.users = new MatTableDataSource(users);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCFS() {
    this._cfsService.getAllCfsMasters().subscribe(
      (cfsMasters) => {
        this.cfsMasters = cfsMasters;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyUsersFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

}
