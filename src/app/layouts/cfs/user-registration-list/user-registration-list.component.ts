import { Cfs } from './../../../shared/models/cfs';
import { UserRegistrationService } from './../services/user-registration.service';
import { Component, OnInit } from '@angular/core';
import { CfsService } from '../../masters/services/cfs.service';

@Component({
  selector: 'app-user-registration-list',
  templateUrl: './user-registration-list.component.html',
  styleUrls: ['./user-registration-list.component.scss']
})
export class UserRegistrationListComponent implements OnInit {
  displayedColumns: string[] = [
    'cfsUserRegistrationId', 'cfsMasterId', 'userTypeId', 'cfsUserName',
    'cfsUserDesignation', 'cfsUserDepartment', 'isActive',
    'isVerified', 'action'
  ];
  public users: [];
  public cfsMasters: Cfs[] = [];
  constructor(
    private _userregistrationService: UserRegistrationService,
    private _cfsService: CfsService
  ) { }

  ngOnInit(): void {
    this.getAllCFS();
    this._userregistrationService.getAllCfsUserRegistration().subscribe(
      (users) => {
        this.users = users;
        console.log(this.users);
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

  searchCfsById(id): string {
    for (let i = 0; i < this.cfsMasters.length; i++) {
      if (this.cfsMasters[i].cfsMasterId === id) {
        return this.cfsMasters[i].cfsName;
      }
    }
  }

}
